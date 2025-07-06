# jobs/serializers.py


from rest_framework import serializers
from .models import Job, Application
from users.models import CustomUser


# Nested serializer for job info inside an application
class JobInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['title', 'description', 'created_at']


# Nested serializer for student info inside an application
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email']


# Serializer for listing job applications (student + job)
class ApplicationSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True) # Read-only for displaying applicant details
    job_details = JobInfoSerializer(source='job', read_only=True) # For displaying job details when reading
    job = serializers.PrimaryKeyRelatedField(queryset=Job.objects.all(), write_only=True) # For accepting job_id during creation
    cv = serializers.FileField(required=False, allow_null=True)
    cover_letter = serializers.CharField(required=False, allow_blank=True) # Ensure cover_letter is handled


    class Meta:
        model = Application
        fields = ['id', 'job', 'job_details', 'student', 'cover_letter', 'cv', 'applied_at']
        read_only_fields = ['student', 'applied_at'] # Student and applied_at are set by the view

    def create(self, validated_data):
        # The 'job' instance is already retrieved by PrimaryKeyRelatedField
        # The 'student' will be set by the view's perform_create method
        return super().create(validated_data)

# Serializer for employer's job listings
class JobSerializer(serializers.ModelSerializer):
    posted_by = serializers.ReadOnlyField(source='posted_by.username')

    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'location', 'created_at', 'posted_by']
