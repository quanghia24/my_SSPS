from django.shortcuts import render
from .models import print_order, print_file
from user.models import User
from .serializers import PrintOrderSerializer, PrintFileSerializer
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from django.http import FileResponse, Http404
import os

class PrintFileViewSet(viewsets.ModelViewSet):
    queryset = print_file.objects.all()
    serializer_class = PrintFileSerializer

# Create your views here.
class PrintOrderViewSet(viewsets.ModelViewSet):
    queryset = print_order.objects.all()
    serializer_class = PrintOrderSerializer

    def get_queryset(self):
        # Fetch the user_id from query parameters
        user_id = self.request.data.get('user_id')
        print_id = self.request.data.get('print_id')

        if user_id:
            user = User.objects.get(user_id=user_id)
            return print_order.objects.filter(user=user)
        if print_id:
            return print_order.objects.filter(id=print_id)
        
        return super().get_queryset()


# spso set status


def download_file(request, filename):
    file_path = 'files/' + filename
    if os.path.exists(file_path):
        response = FileResponse(open(file_path, "rb"), as_attachment=True, filename=f"{filename}")
        return response
    else:
        raise Http404("File not found")

