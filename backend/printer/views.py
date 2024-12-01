
#___________________FUNCTION BASE__________________________________
from django.shortcuts import render, HttpResponse
from .models import Printer
from .serializers import PrinterSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser  # Dùng để phân tích dữ liệu JSON từ request.
from django.views.decorators.csrf import csrf_exempt  # Tắt bảo vệ CSRF cho các view này.
import json
from django.contrib.auth.decorators import login_required
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
    
    elif request.method == "PUT":
        data = JSONParser().parse(request)  # Parse JSON data from the request body
        try:
            printer = Printer.objects.get(id=data['id'])  # Fetch the printer by ID
        except Printer.DoesNotExist:
            return JsonResponse({"error": "Printer not found"}, status=404)

        serializer = PrinterSerializer(printer, data=data)  # Full update
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)


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

    elif request.method == "DELETE":
        printer.delete()
        return HttpResponse(status = 204)

# Get all printer that on status
@csrf_exempt
def status_printers(request):
    if request.method == "POST":
        try:
            # Lấy dữ liệu từ body
            data = json.loads(request.body) if request.body else {}
            status = data.get('status', '')  # Lấy status từ body request

            if not status:
                return JsonResponse({"message": "Status is required."}, status=400)
            
            printers = Printer.objects.filter(status=status)
            if not printers.exists():
                return JsonResponse({"message": "No printers found for this status."}, status=404)
            
            serializer = PrinterSerializer(printers, many=True)
            return JsonResponse(serializer.data, safe=False)
        
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON format."}, status=400)

    return HttpResponse(status=405)


# Get all printers of brand
@csrf_exempt
def brand_printers(request):
    if request.method == "POST":
        try:
            # Lấy dữ liệu từ body
            data = json.loads(request.body) if request.body else {}
            brand = data.get('brand', '')  # Lấy brand từ body request

            if not brand:
                return JsonResponse({"message": "Brand is required."}, status=400)
            
            printers = Printer.objects.filter(brand__iexact=brand)
            if not printers.exists():
                return JsonResponse({"message": "No printers found for this brand."}, status=404)
            
            serializer = PrinterSerializer(printers, many=True)
            return JsonResponse(serializer.data, safe=False)
        
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON format."}, status=400)

    return HttpResponse(status=405)


@csrf_exempt
def add_filetypes(request):
    if request.method == "POST":
        try:
            # Lấy dữ liệu từ body
            data = json.loads(request.body) if request.body else {}
            printer_id = data.get('printer_id', None)  # Lấy printer_id từ body
            filetypes = data.get('filetypes', '')  # Lấy filetypes từ body

            if not printer_id:
                return JsonResponse({"message": "Printer ID is required."}, status=400)
            
            if not filetypes or not isinstance(filetypes, str):
                return JsonResponse({"message": "Invalid or no filetypes provided."}, status=400)

            # Tách chuỗi 'filetypes' thành các phần tử và loại bỏ trùng lặp
            filetypes_list = list(set(filetypes.split()))

            # Lấy printer từ database
            try:
                printer = Printer.objects.get(id=printer_id)
            except Printer.DoesNotExist:
                return JsonResponse({"message": "Printer not found."}, status=404)

            # Lấy các allowed_types hiện tại và đảm bảo là một list
            current_allowed_types = printer.allowed_types or []

            # Kết hợp các allowed_types cũ với filetypes mới
            updated_allowed_types = list(set(current_allowed_types + filetypes_list))

            # Thêm từng filetype vào allowed_types
            for filetype in updated_allowed_types:
                printer.add_type(filetype)

            return JsonResponse({"message": "Filetypes added successfully", "allowed_types": printer.allowed_types}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON format."}, status=400)

    return JsonResponse({"message": "Method not allowed."}, status=405)
