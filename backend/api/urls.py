from django.urls import path, include


urlpatterns = [

    path('users/', include('user.urls')),
    # path('buy/', include('buy.urls')),
    path('prints/', include('print.urls')),
    path('printers/', include('printer.urls')),
    path('reports/', include('report.urls')),
    
]
