from django.shortcuts import render, redirect
from django.contrib import messages
import bcrypt
import datetime
import requests
from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
from registration.models import Colorcombinations

def goauthentication(request):
    return render(request, 'registration/auth.html')

def goregistration(request):
    return render(request, 'registration/registration.html')

def registration(request):
    error = ''
    if User.objects.filter(email=request.POST['email']).exists():
        error=u'Такой e-mail уже зарегистрирован'
        context = {
                "error": error
            }
        return render(request, 'registration/registration.html', context)
    elif request.POST['password']!=request.POST['confirm_password']:
        error=u'Пароли не совпадают'
        context = {
                "error": error
            }
        return render(request, 'registration/registration.html', context)
    else:
        hashed_password = bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt())
        user = User.objects.create(username=request.POST['name'], password=hashed_password.decode('utf-8'), email=request.POST['email'], date_joined=datetime.datetime.now())
        user.save()
        request.session['email'] = user.email     
        return redirect('/main')

def main(request):
    return render(request,'mainApp/homePage.html')

def authentication(request):
    error = ''
    if request.method == 'POST':
        if User.objects.filter(email=request.POST['email']).exists():
            user = User.objects.filter(email=request.POST['email'])[0]
            if bcrypt.checkpw(request.POST['password'].encode(), user.password.encode()):
                request.session['email'] = user.email
                return redirect('/main')
            else:
                error = u'Неверно введен пароль. Попробуйте снова.'
                context = {
                    "error": error
                }
                return render(request, 'registration/auth.html', context)
        else:
            error = u'Такой email не зарегистрирован. Зарегистрируйтесь.'
            context = {
                "error": error
            }
            return render(request, 'registration/auth.html', context)
        return redirect('/main')

def out(request):
    logout(request)
    return redirect('/main')

def contact(request):
    return render(request, 'mainApp/contact.html')

def sendcontact(request):
    data={
        "email": request.POST['email'],
        "message": request.POST['message'] 
    }
    headers={
        "Content-Type":"application/json"
        }
    r=requests.post('https://qmtwk6fpid.execute-api.us-east-1.amazonaws.com/mysite/test',json=data,headers=headers)
    return redirect('/success')

def success(request):
    return render(request, 'mainApp/success.html')

def userpage(request):
    if request.user.is_authenticated:
        context = {
        "login": request.user.username,
        "email": request.user.email,
    }  
    else:
        try:
            request.session['email']
        except KeyError:
            context = {} 
        else: 
            context={
            "login": User.objects.filter(email=request.session['email'])[0],
            "email": request.session['email']
            } 
    return render(request,'mainApp/userpage.html',context)

def savecombination(request):
    if request.method == 'POST':
        colorcombinations = Colorcombinations.objects.get()
        colorcombinations.combination =  request.POST['color']
        colorcombinations.save()
        context = {
            "color":request.POST['color']
        }
    return render(request, 'mainApp/userpage.html',context)

        

   



