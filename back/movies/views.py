import json

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.core.paginator import Paginator
from django.db.models import Count
from django.shortcuts import get_object_or_404, get_list_or_404

from .serializers import (
    MovieListSerializer,
    MovieZipListSerializer,
    MovieSerializer,
    MovieZipSerializer,
    MovieZipSerializer2,
    ArticleSerializer,
    CommentSerializer, 
    GenreSerializer
)
from .models import Movie, Article, Comment, MovieZip, Genre


# Create your views here.
@api_view(['GET'])
def movie_list(request):
    if request.method == 'GET':
        movies = get_list_or_404(Movie)
        paginator = Paginator(movies, 20)

        page = request.GET.get('page', 1)
        page_movies = paginator.get_page(page)

        serializer = MovieListSerializer(page_movies, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializr = MovieSerializer(movie)
    return Response(serializr.data)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def movie_likes(request, movie_pk):
    user = request.user
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.like_users.filter(pk=user.pk).exists():
        movie.like_users.remove(user)
        serializer = MovieSerializer(movie)
        return Response({"message": "Movie removed from likes", "data": serializer.data}, status=status.HTTP_200_OK)
    else:
        user.like_users.add(movie)
        serializer = MovieSerializer(movie)
        return Response({"message": "Movie added to likes", "data": serializer.data}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def movie_wishlist(request, movie_pk):
    user = request.user
    movie = get_object_or_404(Movie, pk=movie_pk)
    
    wishlist_movies = json.loads(user.wishlist_movies) if user.wishlist_movies else []

    if movie.pk in wishlist_movies:
        # 이미 위시리스트에 있는 경우 제거
        wishlist_movies.remove(movie.pk)
        user.wishlist_movies = json.dumps(wishlist_movies)  # 다시 JSON 형태의 문자열로 변환하여 저장
        user.save()
        serializer = MovieSerializer(movie)
        return Response({"message": "Movie removed from wishlist", "data": serializer.data}, status=status.HTTP_200_OK)
    else:
        # 위시리스트에 없는 경우 추가
        wishlist_movies.append(movie.pk)
        user.wishlist_movies = json.dumps(wishlist_movies)  # 다시 JSON 형태의 문자열로 변환하여 저장
        user.save()
        serializer = MovieSerializer(movie)
        return Response({"message": "Movie added to wishlist", "data": serializer.data}, status=status.HTTP_200_OK)


# get 전체 영화 모음집 조회
# post 영화 모음집 생성
@api_view(['GET', 'POST'])
def movie_zip_list_or_create(request):
    if request.method == 'GET':
        movieZips = MovieZip.objects.all()
        paginator = Paginator(movieZips, 10)

        page = request.GET.get('page', 1)
        page_movieZips = paginator.get_page(page)

        serializer = MovieZipListSerializer(page_movieZips, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = MovieZipSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        
# get 영화 모음집 상세 조회, 삭제, 좋아요
@api_view(['GET', 'DELETE', 'POST'])
def movie_zip(request, movie_zip_pk):
    user = request.user
    movieZip = get_object_or_404(MovieZip, pk=movie_zip_pk)
    
    if request.method == 'GET':
        serializer = MovieZipSerializer2(movieZip)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == "DELETE":
        if request.user == movieZip.user:
            movieZip.delete()
            movieZips = MovieZip.objects.all()
            paginator = Paginator(movieZips, 10)
            
            page = request.GET.get('page', 1)
            page_movieZips = paginator.get_page(page)
        
            serializer = MovieZipListSerializer(page_movieZips, many=True)
            return Response(serializer.data)
    
    if request.method == "POST":
        if movieZip.like_users.filter(pk=user.pk).exists():
            movieZip.like_users.remove(user)
            serializer = MovieZipSerializer2(movieZip)
            return Response(serializer.data)
        else:
            movieZip.like_users.add(user)
            serializer = MovieZipSerializer2(movieZip)
            return Response(serializer.data)
    
    
# 영화 모음집 생성시 영화 검색
@api_view(['GET'])
def movie_zip_create_search(request):
    search_query = request.GET.get('search', '')
    movies = Movie.objects.filter(title__icontains=search_query)
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# 영화 리뷰글 전체 조회 및 생성
@api_view(['GET', 'POST'])
def article_list_or_create(request):
    if request.method == 'GET':
        articles = (
            Article.objects.all()
        )
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)
    
    
    if request.method == 'POST':
        movie_data = request.data.get('movie')
        serializer = ArticleSerializer(data=request.data)
        movie_instance = get_object_or_404(Movie, pk=movie_data['pk']) 
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, movie=movie_instance) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE',  'POST'])
def article(request, article_pk):
    user = request.user
    article = get_object_or_404(Article, pk=article_pk)
    
    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == "DELETE":
        if request.user == article.user:
            article.delete()
            articles = Article.objects.all()
            paginator = Paginator(articles, 10)
            
            page = request.GET.get('page', 1)
            page_articles = paginator.get_page(page)
        
            serializer = ArticleSerializer(page_articles, many=True)
            return Response(serializer.data)
    
    
    if request.method == "POST":
        if article.like_users.filter(pk=user.pk).exists():
            article.like_users.remove(user)
            serializer = ArticleSerializer(article)
            return Response(serializer.data)
        else:
            article.like_users.add(user)
            serializer = ArticleSerializer(article)
            return Response(serializer.data)
        
   
@api_view(['GET', 'POST'])     
def comment_list_or_create(request, article_pk):
    user = request.user
    article = get_object_or_404(Article, pk=article_pk)
    
    if request.method=='GET':
        comments = Comment.objects.filter(article=article)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
    
    if request.method =='POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(article=article, user=user)
            comments = article.comments.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        
@api_view(['DELETE',  'POST', 'PUT'])     
def comment(request, article_pk, comment_pk):
    user = request.user
    article = get_object_or_404(Article, pk=article_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)
    
    if request.method == "DELETE":
        if user == comment.user:
            comment.delete()
            article = get_object_or_404(Article, pk=article_pk)
            comments = article.comments.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)        
        else:
            return Response(
                {'error': '권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN
            )
            
    if request.method == "POST":
        if comment.like_users.filter(pk=user.pk).exists():
            comment.like_users.remove(user)
            serializer = CommentSerializer(comment)
            return Response(serializer.data)
        else:
            comment.like_users.add(user)
            serializer = CommentSerializer(comment)
            return Response(serializer.data)
        
    if request.method == "PUT":
        if user == comment.user:
            serializer = CommentSerializer(instance=comment, data=request.data)
            if serializer.is_valid():
                serializer.save()
                updated_comment = serializer.data
                comments = article.comments.all()
                serialized_comments = CommentSerializer(comments, many=True)
                return Response(serialized_comments.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': '권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def genre_list(request):
    if request.method == 'GET':
        genres = get_list_or_404(Genre)
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
def recommend(request):
    if request.method == 'GET':
        genre_query = request.GET.get('genre', '')
        genre_ids = genre_query.split(',')
        movies = Movie.objects.filter(genres__id__in=genre_ids)
        top_rated_movies = movies.order_by('-vote_average').distinct()[:20]
        serializer = MovieListSerializer(top_rated_movies, many=True)
        return Response(serializer.data)
