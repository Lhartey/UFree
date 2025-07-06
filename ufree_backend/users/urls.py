# users/urls.py
# (Modify your existing urls.py for the 'users' app)

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView # Import TokenRefreshView
from .views import CustomTokenObtainPairView, RegisterView, UserProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    # Use our custom login view for token obtaining
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Add the refresh token endpoint
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
]