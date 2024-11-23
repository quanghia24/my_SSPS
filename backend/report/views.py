import json
from .serializers import ReportSerializer
from .models import Report
from user.models import User
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.status import HTTP_204_NO_CONTENT
from django.shortcuts import get_object_or_404, get_list_or_404

class ReportViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


    def get(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            user_id = body.get('user_id')
            report_id = body.get('report_id')
        except json.JSONDecodeError:
            user_id = report_id = None

        if user_id and report_id:
            raise ValidationError(detail='Ambiguity when supplying both user_id and report_id.')

        if report_id:
            report = get_object_or_404(Report, id=report_id)
            serializer = self.serializer_class(report)
            return Response(serializer.data)

        if user_id:
            reports = get_object_or_404(User, user_id=user_id).report_set.all()
        else:
            reports = get_list_or_404(Report)

        serializer = self.serializer_class(reports, many=True)
        return Response(serializer.data)


    def get_permissions(self):
        if self.action == 'destroy':
            return [IsAdminUser]
        return super().get_permissions()


    def delete(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            report_id = body.get('report_id')
        except json.JSONDecodeError:
            report_id = None

        if not report_id:
            raise ValidationError(detail='No report_id provided.')

        report = get_object_or_404(Report, id=report_id)
        report.delete()
        return Response(status=HTTP_204_NO_CONTENT)