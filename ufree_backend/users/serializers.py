# users/serializers.py
# (Modify your existing serializers.py or create this file if it doesn't exist)

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate # Import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    Password is write-only for security.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role') # 'role' is required for registration

    def create(self, validated_data):
        """
        Create a new user instance.
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for displaying user profile information.
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role')

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer for obtaining JWT tokens.
    Allows login with either 'email' or 'username' (case-insensitive for email).
    'role' is not required for login.
    """
    email = serializers.CharField(write_only=True, required=False)
    username = serializers.CharField(write_only=True, required=False) # Keep this for explicit input
    password = serializers.CharField(write_only=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Remove the default 'username' field from the parent class
        # as we are handling both username/email explicitly
        self.fields.pop('username', None)

    def validate(self, attrs):
        """
        Custom validation to allow authentication by email or username.
        """
        email = attrs.get('email')
        username_input = attrs.get('username') # Use a different name to avoid conflict
        password = attrs.get('password')

        if not (email or username_input):
            raise serializers.ValidationError("Must provide either email or username.")
        if not password:
            raise serializers.ValidationError("Password is required.")

        user = None
        # Try to find user by email first if provided
        if email:
            try:
                # Assuming email is unique, retrieve user by email
                # Then authenticate using the actual username field of that user
                # This handles cases where USERNAME_FIELD is 'username' but login is by email
                found_user = User.objects.get(email__iexact=email) # Case-insensitive email lookup
                user = authenticate(request=self.context.get('request'), username=found_user.username, password=password)
            except User.DoesNotExist:
                pass # User not found by email, proceed to try username if provided

        # If no user found by email, or email not provided, try by username
        if not user and username_input:
            user = authenticate(request=self.context.get('request'), username=username_input, password=password)

        if not user or not user.is_active:
            raise AuthenticationFailed('No active account found with the given credentials')

        # If authentication is successful, proceed to get tokens
        refresh = self.get_token(user)

        data = {}
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Include user details in the response
        user_serializer = UserSerializer(user)
        data['user'] = user_serializer.data

        return data