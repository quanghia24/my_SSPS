from django.shortcuts import render
from .models import print_order, print_file
from user.models import User
from printer.models import Printer
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

    def create(self, request, *args, **kwargs):  # Use 'create' instead of 'post' for consistency with DRF conventions
        user = request.user
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'File is required'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={'file': file, 'user': user.id})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):  # Use 'list' for GET requests
        user = request.user
        if user.is_staff:  # Corrected the method call to `is_staff`
            files = print_file.objects.all()
        else:
            files = print_file.objects.filter(user=user)

        serializer = self.get_serializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# Create your views here.
class PrintOrderViewSet(viewsets.ModelViewSet):
    queryset = print_order.objects.all()
    serializer_class = PrintOrderSerializer
    permission_classes = [IsAuthenticated]  # Require authentication

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')  # Use query_params for GET requests
        print_id = self.request.query_params.get('print_id')
        status = self.request.query_params.get('status')

        queryset = super().get_queryset()

        if user_id:
            try:
                user = User.objects.get(id=user_id)  # Corrected to `id` for User model
                queryset = queryset.filter(user=user)
            except User.ObjectDoesNotExist:
                return queryset.none()
        if print_id:
            queryset = queryset.filter(file_id=print_id)
        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def create(self, request, *args, **kwargs):
        user = User.objects.get(user_id=request.user.user_id)
        printer = Printer.objects.get(id = request.data.get('printer'))
                                      
        file_id = request.data.get('file')
        page_cost = request.data.get('page_cost', 0)

        # Check if file exists
        try:
            file = print_file.objects.get(id=file_id)
        except print_file.ObjectDoesNotExist:
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check user's balance
        if user.balance < int(page_cost):  # Assuming user profile has a `balance` field
            return Response({'error': 'Insufficient balance'}, status=status.HTTP_400_BAD_REQUEST)

        if printer.status == 'inactive':
            return Response({'error': 'Printer is not available'}, status=status.HTTP_400_BAD_REQUEST)
        # Deduct balance
        printer.frequency += 1
        printer.printed_papers += page_cost
        printer.save()

        user.balance -= int(page_cost)
        user.save()

        # Create the order
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user, file=file)  # Save with user and file info

        return Response(serializer.data, status=status.HTTP_201_CREATED)




# spso set status


def download_file(request, filename):
    file_path = 'files/' + filename
    if os.path.exists(file_path):
        response = FileResponse(open(file_path, "rb"), as_attachment=True, filename=f"{filename}")
        return response
    else:
        raise Http404("File not found")

