from django.urls import path
from django.conf.urls import include
from . import views

urlpatterns = [
    path('', views.main,name='main'),
    path('main', views.main,name='main'),
    path('goauthentication', views.goauthentication),
    path('goregistration', views.goregistration),
    path('authentication',views.authentication),
    path('registration',views.registration),
    path('accounts/',include('allauth.urls')),
    path('logout', views.out),
    path('contact',views.contact),
    path('sendcontact',views.sendcontact),
    path('success',views.success),
    path('userpage',views.userpage),
    path('savecombination',views.savecombination)
] 
