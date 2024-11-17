from django.urls import path, include


urlpatterns = [

    path('users/', include('user.urls')),
    path('buys/', include('buy.urls')),
    # path('print/', include('print.urls')),
    # path('printer/', include('printer.urls')),
    path('reports/', include('report.urls')),
    
]
