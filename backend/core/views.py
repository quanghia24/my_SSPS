from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render, redirect
from .forms import SignupForm
from django.core.mail import send_mail
from django.http import HttpResponse


def signup(request):
    if(request.method == 'POST'):
        form = SignupForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('/login')

    else:  
        form = SignupForm()

    return render(request, 'core/signup.html', {
        'form' : form
    })



def test_email(request):
    send_mail(
        'Test Email',
        'This is a test email.',
        'nphung.htkhang2020@gmail.com',
        ['hungnguyenphuc772@gmail.com'],
        fail_silently=False,
    )
    return HttpResponse("Test email sent.")

from django.contrib.auth.views import PasswordResetView
from django.urls import reverse_lazy
from .forms import CustomPasswordResetForm

class CustomPasswordResetView(PasswordResetView):
    form_class = CustomPasswordResetForm
    template_name = 'core/password_reset.html'
    email_template_name = 'core/password_reset_email.html'
    success_url = reverse_lazy('core:password_reset_done')
