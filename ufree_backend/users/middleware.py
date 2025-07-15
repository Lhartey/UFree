from django.utils.deprecation import MiddlewareMixin

class CaptureRequestMetaMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Get IP address
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        ip = x_forwarded_for.split(",")[0] if x_forwarded_for else request.META.get("REMOTE_ADDR")
        
        # Get device/user-agent info
        user_agent = request.META.get("HTTP_USER_AGENT", "")
        
        # Attach to request
        request.client_ip = ip
        request.user_agent = user_agent
        
class StoreClientInfoMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.client_ip = request.META.get("HTTP_X_FORWARDED_FOR") or request.META.get("REMOTE_ADDR")
        request.user_agent = request.META.get("HTTP_USER_AGENT", "")[:255]