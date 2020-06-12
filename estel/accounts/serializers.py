from rest_framework import serializers
from django.contrib.auth.models import Group, User
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['first_name'],
            validated_data['last_name'],
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        return user

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'password',)
