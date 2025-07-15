from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework_simplejwt.exceptions import AuthenticationFailed

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = self.get_raw_token(self.get_header(request))
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)

        # Check if token is blacklisted
        try:
            token_obj = OutstandingToken.objects.get(token=str(validated_token))
            if BlacklistedToken.objects.filter(token=token_obj).exists():
                raise AuthenticationFailed('Token is blacklisted')
        except OutstandingToken.DoesNotExist:
            pass  # It's a new token or not tracked (e.g., manually issued access)

        return self.get_user(validated_token), validated_token
