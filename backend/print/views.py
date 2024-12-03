from django.shortcuts import render
from .models import print_order, print_file
from user.models import User
from printer.models import Printer
from django.views.decorators.csrf import csrf_exempt 
from .serializers import PrintOrderSerializer, PrintFileSerializer
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from django.http import FileResponse, Http404
import os
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.parsers import JSONParser

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
@csrf_exempt
def updatePrintOrder(request):
    if request.method == "PATCH":  # Ensure the request is a PATCH method
        try:
            # Parse JSON data from the request body
            data = JSONParser().parse(request)
        except Exception as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=status.HTTP_400_BAD_REQUEST)

        # Extract `print_id` and `status` from the parsed data
        print_id = data.get('print_id')
        status_value = data.get('status')

        # Validate input
        if not print_id or not status_value:
            return JsonResponse({'error': 'Both "print_id" and "status" are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Fetch the print order object
            print_order_instance = print_order.objects.get(id=print_id)
        except print_order.DoesNotExist:
            return JsonResponse({'error': 'Print order not found'}, status=status.HTTP_404_NOT_FOUND)

        # Update the status
        print_order_instance.status = status_value
        print_order_instance.save()

        # Serialize and return the updated data
        serializer = PrintOrderSerializer(print_order_instance)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)

    return JsonResponse({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
def get_my_prints(request):
    if request.method == 'GET':
        user = User.objects.get(user_id=request.user.user_id)
        if not user:
            return JsonResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        print_orders = print_order.objects.filter(user=user)
        serializer = PrintOrderSerializer(print_orders, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    return JsonResponse({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class PrintOrderViewSet(viewsets.ModelViewSet):
    queryset = print_order.objects.all()
    serializer_class = PrintOrderSerializer
    permission_classes = [IsAuthenticated]  # Require authentication

    def get_queryset(self):
        queryset = super().get_queryset()

        user = self.request.user
        if not user.is_staff:
            queryset = queryset.filter(user=user)
            return queryset
        
        user_id = self.request.query_params.get('user_id')  # Use query_params for GET requests
        print_id = self.request.query_params.get('print_id')
        status = self.request.query_params.get('status')


        # Filter by user ID
        if user_id:
            queryset = queryset.filter(user_id=user_id)  # Use `user_id` directly to avoid extra queries

        # Filter by print ID
        if print_id:
            queryset = queryset.filter(file_id=print_id)

        # Filter by status
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

