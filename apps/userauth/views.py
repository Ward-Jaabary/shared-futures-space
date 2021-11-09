# pyre-strict
from django.shortcuts import render
from django.views.generic.edit import UpdateView, DeleteView
from django.urls import reverse_lazy

from .models import CustomUser
from .forms import CustomUserUpdateForm

from .tasks import send_after

from allauth.account.adapter import DefaultAccountAdapter

from django.http import HttpRequest, HttpResponse
from django.core.mail import EmailMessage
from typing import Type, List, Dict, Union

from allauth.account.views import AjaxCapableProcessFormViewMixin, AddEmailForm
from django.views.generic.edit import FormView


# TODO: consider redirecting to dashboard which will have a link to profile view
class CustomUserUpdateView(UpdateView):
    model: Type[CustomUser] = CustomUser
    form_class: Type[CustomUserUpdateForm] = CustomUserUpdateForm
    success_url: str = reverse_lazy('landing')



'''
class CustomUserUpdateView(UpdateView):
    model: Type[CustomUser] = CustomUser
    form_class: Type[CustomUserUpdateForm] = CustomUserUpdateForm
    success_url: str = reverse_lazy(profile_view)
'''


class CustomUserDeleteView(DeleteView):
    model: Type[CustomUser] = CustomUser
    success_url: str = reverse_lazy('landing')


# for overriding default email send behaviour: https://stackoverflow.com/a/55965459
class CustomAllauthAdapter(DefaultAccountAdapter):
    def send_mail(self, template_prefix: str, email: Union[str, List[str]], context: Dict[str, str]) -> None:
        msg: EmailMessage = self.render_mail(template_prefix, email, context)
        send_after.delay(5, msg)


class EmailView(AjaxCapableProcessFormViewMixin, FormView):
    template_name = "account/email."
    form_class = AddEmailForm
    print('LOL')
    success_url = reverse_lazy("account_email")

