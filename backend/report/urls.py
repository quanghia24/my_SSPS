from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReportViewSet, UserReportViewSet

router = DefaultRouter()
router.register('', ReportViewSet, basename='report')
router.register('user', UserReportViewSet, basename='user-report')


urlpatterns = router.urls