# jobs/views.py

from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView # Keep APIView if needed elsewhere, though generics.ListAPIView is used below
from rest_framework.response import Response
from .models import Job, Application
from .serializers import JobSerializer, ApplicationSerializer
from .permissions import IsEmployer, IsOwner, IsStudent, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import Http404 # Import Http404
from rest_framework import serializers # Import serializers for ValidationError

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
        # Only the employer who created the job can update it
        if self.request.user != serializer.instance.posted_by:
            raise PermissionDenied("You do not have permission to update this job.")
        serializer.save()

    def perform_destroy(self, instance):
        # Only the employer who created the job can delete it
        if self.request.user != instance.posted_by:
            raise PermissionDenied("You do not have permission to delete this job.")
        instance.delete()


class ApplicationListCreateView(generics.ListAPIView):
    """
    This view is intended for listing applications for a specific job (if job_id is in URL)
    or applications by the current student (if no job_id).
    Its URL path '<int:job_id>/apply/' is somewhat ambiguous for a ListAPIView.
    """
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent] # Or IsEmployer if viewing all for a job

    def get_queryset(self):
        job_id = self.kwargs.get('job_id')
        if job_id:
            # If job_id is in URL, list applications for that job by the current student
            return Application.objects.filter(job__id=job_id, student=self.request.user).order_by('-applied_at')
        # Otherwise, list all applications by the current student
        return Application.objects.filter(student=self.request.user).order_by('-applied_at')


class ApplyJobView(generics.CreateAPIView):
    """
    Allow authenticated students to apply for a job.
    Expects 'job' (job_id) and 'cover_letter' in the request body.
    Handles CV uploads via MultiPartParser/FormParser.
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        job_instance = serializer.validated_data['job']
        # Check if student has already applied to this job
        if Application.objects.filter(job=job_instance, student=self.request.user).exists():
            raise serializers.ValidationError({"detail": "You have already applied for this job."})

        serializer.save(student=self.request.user)


class JobApplicationListView(generics.ListAPIView):
    """
    List all applications for a specific job (for employers).
    This view expects job_id as 'pk' from the URL.
    """
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployer]

    def get_queryset(self):
        job_id = self.kwargs.get('pk')
        try:
            job = Job.objects.get(pk=job_id)
        except Job.DoesNotExist:
            raise Http404("Job not found.")

        # Only allow access if current user is the job's poster
        if job.posted_by != self.request.user:
            raise PermissionDenied("You can only view applications to your own jobs.")

        return Application.objects.filter(job=job).order_by('-applied_at')


class EmployerJobApplicationsView(generics.ListAPIView):
    """
    List applications for a specific job owned by the current employer.
    This view expects job_id from the URL.
    """
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, IsEmployer]

    def get_queryset(self):
        job_id = self.kwargs.get('job_id')
        try:
            job = Job.objects.get(id=job_id, posted_by=self.request.user) # Use posted_by as per your Job model
        except Job.DoesNotExist:
            raise Http404("Job not found or not authorized.")

        return Application.objects.filter(job=job).select_related('applicant').order_by('-applied_at')


class MyApplicationsView(generics.ListAPIView):
    """
    List all applications made by the current student.
    """
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        return Application.objects.filter(student=self.request.user).select_related('job').order_by('-applied_at')