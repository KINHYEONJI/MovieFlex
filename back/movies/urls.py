from django.urls import path
from . import views


app_name = 'movies'
urlpatterns = [
    path('', views.movie_list), 
    path('<int:movie_pk>/', views.movie_detail), #영화 상세조회
    path('<int:movie_pk>/likes/', views.movie_likes), #영화 좋아요
    path('<int:movie_pk>/wishlist/', views.movie_wishlist), #찜목록 추가
    
    path('movie-zips/', views.movie_zip_list_or_create), #영화 모음집 전체 조회, 영화 모음집 생성
    path('movie-zips/<int:movie_zip_pk>/', views.movie_zip), # 영화 모음집 상세조회, 삭제, 좋아요
    path('create/search/', views.movie_zip_create_search), # 영화 모음집, 게시글 생성시 영화 검색
    
    path('articles/', views.article_list_or_create), # 게시글 전체 조회, 게시글 생성 
    path('articles/<int:article_pk>/', views.article), # 게시글 상제조회, 삭제, 좋아요
    
    path('articles/<int:article_pk>/comments/', views.comment_list_or_create), # 댓글 전체 조회, 댓글 생성
    path('articles/<int:article_pk>/comments/<int:comment_pk>', views.comment), # 댓글 수정, 삭제, 좋아요

    path('recommend/genres/', views.genre_list), # 모든 장르 조회
    path('recommend/', views.recommend), # 선택된 장르에 해당하는 영화 조회
]
