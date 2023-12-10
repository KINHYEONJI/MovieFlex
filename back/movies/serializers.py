from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from rest_framework import serializers


User = get_user_model()


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('pk', 'name',)
        
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname')
        
        
class LikeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname')
        
    
class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('pk', 'name', 'profile_path')
        
        
class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ('pk', 'title', 'vote_average', 'poster_path', 'genres', 'overview', 'runtime')
        
class MovieListSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        fields = ('pk', 'title', 'vote_average', 'poster_path', 'genres', 'overview', 'runtime')
        
        
class ArticleSerializer(serializers.ModelSerializer):
    class MovieSerializer(serializers.ModelSerializer):
        genres = GenreSerializer(many=True, read_only=True)

        class Meta:
            model = Movie
            fields = ('pk', 'title', 'vote_average', 'poster_path', 'genres')
        
        
    user = UserSerializer(read_only=True)
    like_users = LikeUserSerializer(read_only=True, many=True)
    like_user_count = serializers.IntegerField(
        source='like_users.count', read_only=True
    )
    movie = MovieSerializer(read_only=True)
    
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('movie',)


class MovieSerializer2(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    genres = GenreSerializer(read_only=True, many=True)
    actors = ActorSerializer(read_only=True, many=True)
    like_movies = UserSerializer(read_only=True, many=True)
    articles = ArticleSerializer(many=True)

    class Meta:
        model = Movie
        exclude = (
            'popularity',
            'tagline',
            'vote_count',
            'words',
        )


class MovieZipListSerializer(serializers.ModelSerializer):
    class MovieZipSerializer(serializers.ModelSerializer):
        class Meta:
            model = MovieZip
            fields = ('id', 'title', 'poster_path')
    
    class Meta:
        model = MovieZip
        fields = ("__all__")
        
        
# 영화 모음집 등록
class MovieZipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    like_users = LikeUserSerializer(read_only=True, many=True)
    movies = serializers.ListField(child=serializers.IntegerField())
    
    class Meta:
        model = MovieZip
        fields = ('pk', 'user', 'like_users', 'movies', 'title', 'content', 'poster_path')


# 영화 모음집 상세 조회
class MovieZipSerializer2(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    like_users = LikeUserSerializer(read_only=True, many=True)
    like_user_count = serializers.IntegerField(
        source='like_users.count', read_only=True
    )
        
    class Meta:
        model = MovieZip
        fields = ('pk', 'user', 'like_users', 'like_user_count', 'movies', 'title', 'content')


        
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    like_users = LikeUserSerializer(read_only=True, many=True)
    like_user_count = serializers.IntegerField(
        source='like_users.count', read_only=True
    )
    
    class ArticleSerializer(serializers.ModelSerializer):
        class Meta:
            model = Article
            fields = ('pk',)

    article = ArticleSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = (
            'pk',
            'user',
            'like_users',
            'like_user_count',
            'article',
            'content',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('article',)

