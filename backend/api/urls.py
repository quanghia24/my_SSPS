from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from user.views import UserViewSet

# router = DefaultRouter()
# router.register('users', UserViewSet, basename='users')
# router.register('hitories', HistoryViewSet, basename='history')
# router.register('prints', PrintViewSet, basename='print')
# router.register('Reviews', ReviewViewSet, basename='review')





urlpatterns = [
    path('users/', include('user.urls')),
    # path('buy/', include('buy.urls')),
    # path('print/', include('print.urls')),
    # path('printer/', include('printer.urls')),
    path('reports/', include('report.urls')),
    
]
