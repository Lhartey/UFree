from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('employer', 'Employer'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')

    def __str__(self):
        return f"{self.username} ({self.role})"

class TokenMetadata(models.Model):
    token = models.OneToOneField(OutstandingToken, on_delete=models.CASCADE, related_name='metadata')
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=255, null=True, blank=True)