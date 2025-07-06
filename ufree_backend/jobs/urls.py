# jobs/urls.py

from django.urls import path
from .views import (
    JobListCreateView,
    JobDetailView,
    ApplicationListCreateView,
    JobApplicationListView,
    EmployerJobApplicationsView,
    MyApplicationsView,
    ApplyJobView, # Import the new view
)

urlpatterns = [
    # Handles GET /api/jobs/ (list all jobs) and POST /api/jobs/ (create new job)
    path('', JobListCreateView.as_view(), name='job_list_create'),

    # Handles GET, PUT, PATCH, DELETE for a specific job
    path('<int:pk>/', JobDetailView.as_view(), name='job_detail'),

    # This path is for applying to a job when job_id is in the URL (e.g., /api/jobs/123/apply/)
    # It's currently a ListAPIView for applications.
    path('<int:job_id>/apply/', ApplicationListCreateView.as_view(), name='application_list_create_by_job_id'),

    # NEW: Handles POST /api/jobs/apply/ (job_id in request body)
    path('apply/', ApplyJobView.as_view(), name='apply_job'),

    # List applications for a specific job (for employers), using 'pk' as job_id
    path('<int:pk>/applications/employer/', JobApplicationListView.as_view(), name='job_applications_by_employer'),

    # List applications for a specific job owned by the current employer, using 'job_id'
    path('<int:job_id>/applications/owner/', EmployerJobApplicationsView.as_view(), name='job_applications_owner'),

    # List applications made by the current user (student)
    path('my-applications/', MyApplicationsView.as_view(), name='my_applications'),
]
