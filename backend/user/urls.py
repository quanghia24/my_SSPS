from .views import MyTokenObtainPairView, BalanceView

from django.urls import path
from .views import RegisterUserView, UserView, AllUsersView, DeleteView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('', AllUsersView.as_view()),
    path('profile/', UserView.as_view()),
    path('register/', RegisterUserView.as_view()),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('balance/', BalanceView.as_view(), name='balance'),
    path("delete/", DeleteView.as_view(), name='delete')
]