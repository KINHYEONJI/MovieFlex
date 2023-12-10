from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

# from django.db.models import Count

# from .serializers import (
#     ProfileSerializer,
# )


# User = get_user_model()



# @api_view(['GET'])
# def profile(request, user_pk):
#     user = get_object_or_404(User, pk=user_pk)

#     articles = ProfileSerializer(user)

#     return Response(articles.data)
