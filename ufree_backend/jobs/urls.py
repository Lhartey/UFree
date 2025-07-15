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
    EmployerJobListView
)

urlpatterns = [
    path('', JobListCreateView.as_view(), name='job_list_create'),
    path('<int:pk>/', JobDetailView.as_view(), name='job_detail'),
    path('<int:job_id>/apply/', ApplicationListCreateView.as_view(), name='application_list_create_by_job_id'),
    path('apply/', ApplyJobView.as_view(), name='apply_job'),
    path('<int:pk>/applications/employer/', JobApplicationListView.as_view(), name='job_applications_by_employer'),
    path('<int:job_id>/applications/owner/', EmployerJobApplicationsView.as_view(), name='job_applications_owner'),
    path('my-applications/', MyApplicationsView.as_view(), name='my_applications'),
    path('employer/', EmployerJobListView.as_view(), name='employer_job_list'),  # <- updated line
]