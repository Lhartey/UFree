# jobs/serializers.py

from rest_framework import serializers
from .models import Job, Application
from users.models import CustomUser


class JobInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['title', 'description', 'created_at']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email']


class ApplicationSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    job_details = JobInfoSerializer(source='job', read_only=True)
    job = serializers.PrimaryKeyRelatedField(queryset=Job.objects.all(), write_only=True)
    cover_letter = serializers.CharField(required=False, allow_blank=True)
    cv = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = ['id', 'job', 'job_details', 'student', 'cover_letter', 'cv', 'applied_at']
        read_only_fields = ['student', 'applied_at']

    def get_cv(self, obj):
        request = self.context.get('request')
        if obj.cv and hasattr(obj.cv, 'url'):
            if request:
                return request.build_absolute_uri(obj.cv.url)
            return obj.cv.url
        return None

    def create(self, validated_data):
        return super().create(validated_data)

class JobSerializer(serializers.ModelSerializer):
    posted_by = serializers.ReadOnlyField(source='posted_by.username')
    application_count = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'location', 'created_at', 'posted_by', 'application_count']

    def get_application_count(self, obj):
        return obj.applications.count()