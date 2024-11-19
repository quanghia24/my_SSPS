from .serializers import ReportSerializer
from .models import Report
from rest_framework import viewsets
from rest_framework.response import Response


# Create your views here.
class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


class UserReportViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        reports = Report.objects.filter(user=pk)
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)