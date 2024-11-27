
#___________________FUNCTION BASE__________________________________
from django.shortcuts import render, HttpResponse
from .models import Printer
from .serializers import PrinterSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser  # Dùng để phân tích dữ liệu JSON từ request.
from django.views.decorators.csrf import csrf_exempt  # Tắt bảo vệ CSRF cho các view này.
from django.contrib.auth.decorators import user_passes_test
# Tạo các view xử lý ở đây.

@csrf_exempt # Tắt bảo vệ CSRF cho view
def printer_list(request):
    if request.method == "GET":
        printers = Printer.objects.all()

        serializer = PrinterSerializer(printers, many = True)
        return JsonResponse(serializer.data, safe = False)

    elif request.method == "POST":
        data = JSONParser().parse(request) # Phân tích dữ liệu JSON từ phần body của yêu cầu.
        serializer = PrinterSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = 201)
        return JsonResponse(serializer.errors, status = 400)
    
    elif request.method == 'PATCH':
        data = JSONParser().parse(request)
        printer = Printer.objects.get(id=data['id'])
        serializer = PrinterSerializer(printer, data = data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status = 400)

@csrf_exempt
def printer_details(request, pk):
    try:
        printer = Printer.objects.get(pk = pk)

    except Printer.DoesNotExist:
        return HttpResponse(status = 404)

    if request.method == "GET":
        serializer = PrinterSerializer(printer)
        return JsonResponse(serializer.data)

    elif request.method == "PUT":
        data = JSONParser().parse(request)
        serializer = PrinterSerializer(printer, data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status = 400)
    elif request.method == "DELETE":
        printer.delete()
        return HttpResponse(status = 204)

# Get all printer that on status
@csrf_exempt
def active_printers(request):
    if request.method == "GET":
        printers = Printer.objects.filter(status = 'active')
        serializer = PrinterSerializer(printers, many = True)
        return JsonResponse(serializer.data, safe = False)
    return HttpResponse(status = 405)

# Get all printers of brand
def brand_printers(request, brand):
    if request.method == "GET":
        printers = Printer.objects.filter(brand__iexact=brand)  # Sửa lại filter
        if not printers.exists():
            return JsonResponse({"message": "No printers found for this brand."}, status=404)
        serializer = PrinterSerializer(printers, many=True)
        return JsonResponse(serializer.data, safe=False)
    return HttpResponse(status=405)