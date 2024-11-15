from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Printer

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def set_printer_status(request, pk):
    try:
        printer = Printer.objects.get(pk=pk)
    except Printer.DoesNotExist:
        return Response({"error": "Printer not found."}, status=status.HTTP_404_NOT_FOUND)
    
    new_status = request.data.get('status')
    if new_status not in ['1', '2', '3']:  # '1' - available, '2' - occupied, '3' - offline
        return Response({"error": "Invalid status value."}, status=status.HTTP_400_BAD_REQUEST)
    
    printer.status = new_status
    printer.save()
    return Response({"status": new_status}, status=status.HTTP_200_OK)
