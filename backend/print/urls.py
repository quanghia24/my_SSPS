from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PrintOrderViewSet, download_file, PrintFileViewSet, updatePrintOrder, get_my_prints

router = DefaultRouter()
router.register('orders', PrintOrderViewSet, basename='printing_logs')
router.register('files', PrintFileViewSet, basename='files_logs')


urlpatterns = [
    path('', include(router.urls)),
    path('update/', updatePrintOrder),
    path('myprints/', get_my_prints),
    path('download_file/', download_file, name='download_file')
]


