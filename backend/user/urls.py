from .views import MyTokenObtainPairView, BalanceView

from django.urls import path
from .views import RegisterUserView, UserView, AllUsersView, DeleteView, DefaultPaperViewSet, ResetDateView, ResetAllBalanceView
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
    path("delete/", DeleteView.as_view(), name='delete'),
    path('paper/', DefaultPaperViewSet.as_view(), name='paper'),
    path('reset-date/', ResetDateView.as_view(), name='reset-date'),
    path('reset-all-balance/', ResetAllBalanceView.as_view(), name='reset-all-balance'),
]