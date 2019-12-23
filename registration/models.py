from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    login = models.CharField(max_length=50)
    email = models.CharField(max_length=50, primary_key=True)
    password = models.CharField(max_length=255)
    date = models.DateTimeField()

class Colorcombinations(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    combination = models.CharField(max_length=255)


    
