from logging import exception
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
from rest_framework import generics
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets
from PIL import Image
import os.path


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
        request.data['user'] = request.user.id

        if serializer.is_valid():
            task = serializer.save()
            if task:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        todos_list = Todos.objects.filter(user_id=request.user.id)
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


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def get_user_by_id(request, id):

    # task = request.data
    # print(task)

    if request.method == 'GET':
        user = User.objects.get(id=id)
        serializer = GetUserSerializer(user)
        if serializer:
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        user = User.objects.get(id=id)
        serializer = GetUserSerializer(user, request.data)
        if serializer.is_valid():
            taskData = serializer.save()
            if taskData:
                print("Serializer is valid and data saved.")
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        else:
            print("Invalid Serializer.")
            return Response(serializer.errors)


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()

            return Response(status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'PUT'])
@permission_classes([AllowAny])
def forgot_password(request):

    if request.method == "POST":

        try:
            user = User.objects.get(phone_number=request.data["phone_number"])
        except User.DoesNotExist:
            return Response("User Doe's not Exist.", status=status.HTTP_404_NOT_FOUND)

        if user:

            return Response(status=status.HTTP_200_OK)

        else:

            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":

        try:
            user = User.objects.get(email=request.data["email"])
        except User.DoesNotExist:
            return Response("User Doe's not Exist.", status=status.HTTP_404_NOT_FOUND)

        if user:
            new_password = make_password(request.data["password"])
            user.password = new_password
            user.save()
            return Response(status=status.HTTP_201_CREATED)

        else:

            return Response(status=status.HTTP_404_NOT_FOUND)

    return Response("Forgot password Triggered", status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_profile_image(request):

    if request.method == "POST":

        try:
            user = User.objects.get(id=request.user.id)
        except User.DoesNotExist:
            return Response("User Doe's not Exist.", status=status.HTTP_404_NOT_FOUND)

        if user:

            if len(request.FILES) != 0:

                if user.image:
                    print("user have image")

                    if os.path.exists(user.image.path):
                        print("found image in local dir")
                        os.remove(user.image.path)
                        serializer = UserProfilePicSerializer(
                            user, request.data)
                        if serializer.is_valid():
                            serializer.save()
                            return Response(serializer.data, status=status.HTTP_201_CREATED)
                    else:
                        print("not found url related image")
                        serializer = UserProfilePicSerializer(
                            user, request.data)
                        if serializer.is_valid():
                            serializer.save()
                            return Response(serializer.data, status=status.HTTP_201_CREATED)

                else:
                    print("user don't have image")
                    serializer = UserProfilePicSerializer(user, request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
