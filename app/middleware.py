from django.http import QueryDict

class HttpPostTunnelingMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        
        if request.method.lower() == 'put':
        	request.PUT = QueryDict(request.body)
        if request.method.lower() == 'delete':
        	request.DELETE = QueryDict(request.body)

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response
