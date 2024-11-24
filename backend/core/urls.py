from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
# from django.conf import settings
# from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', obtain_auth_token),
    path('api/', include('api.urls')),
] 
