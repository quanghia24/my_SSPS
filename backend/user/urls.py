from django.urls import path
from . import views, serializers
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (

    TokenRefreshView,
)
urlpatterns = [
    path ('', views.getRoutes),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', serializers.RegisterView.as_view(), name='register'),

]

