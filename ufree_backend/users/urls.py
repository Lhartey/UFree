# users/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    RegisterView,
    UserProfileView,
    LoginSessionView,
    LogoutSessionView,
    LogoutAllSessionsView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('sessions/', LoginSessionView.as_view(), name='user_sessions'),
    path('logout-session/', LogoutSessionView.as_view(), name='logout_session'),
    path('logout-all-sessions/', LogoutAllSessionsView.as_view(), name='logout_all_sessions'),
]
