from django.db import models
from django.conf import settings

class Job(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    posted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='jobs'
    )

    def __str__(self):
        return f"{self.title} - {self.posted_by.username}"


class Application(models.Model):
    job = models.ForeignKey('Job', on_delete=models.CASCADE, related_name='applications')
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    message = models.TextField(blank=True)
    cover_letter = models.TextField(blank=True)
    cv = models.FileField(upload_to='cvs/', blank=True, null=True)
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['job', 'student']

    def __str__(self):
        return f"{self.student.username} -> {self.job.title}"
