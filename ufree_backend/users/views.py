# users/views.py
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils.timezone import now
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer, UserSerializer
from django.contrib.auth import get_user_model
from django.utils.timezone import localtime
from rest_framework.pagination import PageNumberPagination
from .models import TokenMetadata

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        refresh = response.data.get("refresh")
        if refresh:
            try:
                token_obj = OutstandingToken.objects.get(token=refresh)
                token_obj.user_agent = request.META.get("HTTP_USER_AGENT", "")[:255]
                token_obj.ip_address = request.META.get("HTTP_X_FORWARDED_FOR") or request.META.get("REMOTE_ADDR")
                token_obj.save(update_fields=["user_agent", "ip_address"])
            except Exception:
                pass

        return response

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

class SessionPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 50

class LoginSessionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            current_token_jti = request.auth.get("jti") if request.auth else None
            tokens = OutstandingToken.objects.filter(user=request.user).order_by('-created_at')

            # Clean expired tokens (optional)
            for token in tokens:
                if token.expires_at < now():
                    BlacklistedToken.objects.get_or_create(token=token)

            paginator = SessionPagination()
            paginated_tokens = paginator.paginate_queryset(tokens, request)

            sessions = []
            for token in paginated_tokens:
                is_blacklisted = BlacklistedToken.objects.filter(token=token).exists()
                sessions.append({
                    "id": str(token.jti),
                    "created_at": localtime(token.created_at).isoformat(),
                    "expires_at": localtime(token.expires_at).isoformat(),
                    "blacklisted": is_blacklisted,
                    "token_type": "refresh",
                    "current": token.jti == current_token_jti,
                    "ip_address": getattr(token, "ip_address", ""),
                    "device_info": getattr(token, "user_agent", ""),
                })

            return paginator.get_paginated_response({"sessions": sessions})
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class LogoutSessionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        jti = request.data.get("jti")
        if not jti:
            return Response({"error": "Token ID (jti) is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = OutstandingToken.objects.get(jti=jti, user=request.user)
            BlacklistedToken.objects.get_or_create(token=token)
            return Response({"detail": "Session logged out successfully."}, status=status.HTTP_200_OK)
        except OutstandingToken.DoesNotExist:
            return Response({"error": "Token not found or not yours."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LogoutAllSessionsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            tokens = OutstandingToken.objects.filter(user=request.user)
            for token in tokens:
                BlacklistedToken.objects.get_or_create(token=token)
            return Response({"detail": "All sessions logged out successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
