from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, SPSOViewSet

router = DefaultRouter()
router.register('students', StudentViewSet, basename='students')
router.register('spsos', SPSOViewSet, basename='spsos')





urlpatterns = [
    path('', include(router.urls)),
]
