from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.EmailField(max_length=30, unique=True)
    email = models.EmailField(max_length=254, blank=True, null=True)
    nickname = models.CharField(max_length=30)
    wishlist_movies = models.TextField(blank=True, null=True)

    USERNAME_FIELD = 'username'