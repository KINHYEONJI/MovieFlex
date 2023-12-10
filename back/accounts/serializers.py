from rest_framework import serializers
from allauth.account import app_settings as allauth_settings
from allauth.utils import get_username_max_length
from allauth.account.adapter import get_adapter
from .models import User
from dj_rest_auth.registration.serializers import RegisterSerializer
from movies.models import Movie, Article, MovieZip

class CustomRegisterSerializer(RegisterSerializer):
    nickname = serializers.CharField(max_length=30, required=True)
    wishlist_movies = serializers.ListField(child=serializers.IntegerField(), required=False)
    
    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'nickname': self.validated_data.get('nickname', ''),
            'wishlist_movies': self.validated_data.get('wishlist_movies', ''),
        }


    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        user.nickname = self.validated_data['nickname'] 
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        return user
    
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname')