from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Printer
from .serializers import PrinterSerializer

class PrinterViewSet(viewsets.ModelViewSet):
    queryset = Printer.objects.all()
    serializer_class = PrinterSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['patch'])
    def set_status(self, request, pk=None):
        printer = self.get_object()
        new_status = request.data.get('status')
        if new_status not in ['1', '2', '3']:  # '1' - available, '2' - occupied, '3' - offline
            return Response({"error": "Invalid status value."}, status=status.HTTP_400_BAD_REQUEST)
        printer.status = new_status
        printer.save()
        return Response({ "status": new_status}, status=status.HTTP_200_OK)
