from django.shortcuts import render
from .models import print_order, print_file
from user.models import User
from .serializers import PrintOrderSerializer, PrintFileSerializer
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from django.http import FileResponse, Http404
import os
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

class PrintFileViewSet(viewsets.ModelViewSet):
    queryset = print_file.objects.all()
    serializer_class = PrintFileSerializer
    permission_classes = [IsAuthenticated]  # Require authentication
    parser_classes = [MultiPartParser, FormParser]  # Enable handling file uploads

    def create(self, request, *args, **kwargs):
        file = request.FILES.get('file')  # Get the uploaded file
        user = User.objects.get(user_id=request.user.user_id)

        if not file:
            return Response({'error': 'File is required'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={'file': file, 'user': user})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# Create your views here.
class PrintOrderViewSet(viewsets.ModelViewSet):
    queryset = print_order.objects.all()
    serializer_class = PrintOrderSerializer

    def get_queryset(self):
        # Fetch the user_id from query parameters
        user_id = self.request.data.get('user_id')
        print_id = self.request.data.get('print_id')
        status = self.request.data.get('status')

        if user_id:
            user = User.objects.get(user_id=user_id)
            return print_order.objects.filter(user=user)
        if print_id:
            return print_order.objects.filter(id=print_id)
        if status:
            return print_order.objects.filter(status=status)
        return super().get_queryset()


# spso set status


def download_file(request, filename):
    file_path = 'files/' + filename
    if os.path.exists(file_path):
        response = FileResponse(open(file_path, "rb"), as_attachment=True, filename=f"{filename}")
        return response
    else:
        raise Http404("File not found")

