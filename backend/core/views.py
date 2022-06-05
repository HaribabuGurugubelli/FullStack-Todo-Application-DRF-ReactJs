from pickle import PUT
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


@api_view(['POST'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([AllowAny])
def user_registration(request):

    if request.method == 'POST':

        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


class user_login(TokenObtainPairView):
    serializer_class = UserLoginSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    
    if request.method == 'GET':
        users_list = User.objects.all()
        serializer = AllUserSerializer(users_list, many=True)
        if serializer:
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_all_tasks(request):

    if request.method == 'POST':
        serializer = TaskUpdateSerializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            if task:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        todos_list = Todos.objects.all()
        serializer = TaskSerializer(todos_list, many=True)
        if serializer:
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_task_by_id(request, id):

    # task = request.data
    # print(task)

    if request.method == 'POST':
        todo = Todos.objects.get(id=id)
        serializer = TaskSerializer(todo)
        if serializer:
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        todo = Todos.objects.get(id=id)
        serializer = TaskUpdateSerializer(todo, request.data)
        if serializer.is_valid():
            taskData = serializer.save()
            if taskData:
                print("Serializer is valid and data saved.")
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        else:
            print("Invalid Serializer.")
            return Response(serializer.errors)

    if request.method == 'DELETE':
        todo = Todos.objects.get(id=id)
        todo_delete = todo.delete()

        if todo_delete:
            return Response("Deleted Successfully", status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


