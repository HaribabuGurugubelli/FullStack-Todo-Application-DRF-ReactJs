from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    phone_number = serializers.CharField(required=True)
    full_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=5, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'phone_number', 'full_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class RoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Roles
        fields = '__all__'


class UserLoginSerializer(TokenObtainPairSerializer):
    @classmethod
    # role = RoleSerializer()
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['id'] = user.id
        token['email'] = user.email
        token['phone_number'] = user.phone_number
        token['full_name'] = user.full_name
        # token['role'] = RoleSerializer()
        token['role'] = user.role_id
        # ...

        return token


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'phone_number', 'full_name']


class TaskSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Todos
        fields = '__all__'


class TaskUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todos
        fields = '__all__'


class AllUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
