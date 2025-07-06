# users/views.py
# (Modify your existing views.py or create this file)

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer, UserSerializer

# Assuming your User model is correctly imported or get_user_model() is used
from django.contrib.auth import get_user_model
User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom view for obtaining JWT tokens using our flexible serializer.
    """
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    """
    View for user registration.
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class UserProfileView(generics.RetrieveAPIView):
    """
    View for retrieving the authenticated user's profile.
    """
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        """
        Returns the user object associated with the current request.
        """
        return self.request.user