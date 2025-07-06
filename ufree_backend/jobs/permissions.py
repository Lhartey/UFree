# jobs/permissions.py

from rest_framework import permissions

class IsEmployer(permissions.BasePermission):
    """
    Allows access only to users with the 'employer' role.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'employer'

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow job owners to edit or delete their own job.
    """
    def has_object_permission(self, request, view, obj):
        return obj.posted_by == request.user

class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'student'

class IsAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated