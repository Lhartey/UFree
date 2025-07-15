# jobs/views.py

from rest_framework import generics, permissions, status, serializers
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Job, Application
from .serializers import JobSerializer, ApplicationSerializer
from .permissions import IsEmployer, IsOwner, IsStudent, IsAuthenticated


class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated(), IsEmployer()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)


class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated(), IsOwner()]
        return [permissions.IsAuthenticated()]

    def perform_update(self, serializer):
        if self.request.user != serializer.instance.posted_by:
            raise PermissionDenied("You do not have permission to update this job.")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user != instance.posted_by:
            raise PermissionDenied("You do not have permission to delete this job.")
        instance.delete()


class ApplicationListCreateView(generics.ListAPIView):
    """
    Lists applications for a specific job (if job_id in URL)
    or applications by the current student.
    """
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_queryset(self):
        job_id = self.kwargs.get('job_id')
        if job_id:
            return Application.objects.filter(job__id=job_id, student=self.request.user).order_by('-applied_at')
        return Application.objects.filter(student=self.request.user).order_by('-applied_at')

    def get_serializer_context(self):
        return {"request": self.request}


class ApplyJobView(generics.CreateAPIView):
    """
    Allow students to apply for a job (handles file upload).
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        job_instance = serializer.validated_data['job']
        if Application.objects.filter(job=job_instance, student=self.request.user).exists():
            raise serializers.ValidationError({"detail": "You have already applied for this job."})
        serializer.save(student=self.request.user)


class JobApplicationListView(generics.ListAPIView):
    """
    List all applications for a specific job (for employers).
    """
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployer]

    def get_queryset(self):
        job_id = self.kwargs.get('pk')
        try:
            job = Job.objects.get(pk=job_id)
        except Job.DoesNotExist:
            raise Http404("Job not found.")

        if job.posted_by != self.request.user:
            raise PermissionDenied("You can only view applications to your own jobs.")

        return Application.objects.filter(job=job).select_related('student').order_by('-applied_at')

    def get_serializer_context(self):
        return {"request": self.request}


class EmployerJobApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, IsEmployer]

    def get_queryset(self):
        job_id = self.kwargs.get('job_id')
        try:
            job = Job.objects.get(id=job_id, posted_by=self.request.user)
        except Job.DoesNotExist:
            raise Http404("Job not found or not authorized.")
        return Application.objects.filter(job=job).select_related('student').order_by('-applied_at')

    def get_serializer_context(self):
        # This is important for generating absolute URLs in get_cv
        return {'request': self.request}


class MyApplicationsView(generics.ListAPIView):
    """
    List all applications submitted by the logged-in student.
    """
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        return Application.objects.filter(student=self.request.user).select_related('job').order_by('-applied_at')

    def get_serializer_context(self):
        return {"request": self.request}

class EmployerJobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated, IsEmployer]

    def get_queryset(self):
        return Job.objects.filter(posted_by=self.request.user).order_by('-created_at')
