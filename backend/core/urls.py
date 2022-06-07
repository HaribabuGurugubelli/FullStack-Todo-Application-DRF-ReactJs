from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *


urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user_login/', user_login.as_view(), name='user_login'),
    path('user_registration/', user_registration, name='user_registration'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('forgot_password/', forgot_password, name='forgot_password'),


    path('get_all_users/', get_all_users, name='get_all_users'),
    path('get_all_tasks/', get_all_tasks, name='get_all_tasks'),
    path('get_task_by_id/<int:id>/', get_task_by_id, name='get_task_by_id'),
    path('get_user_by_id/<int:id>/', get_user_by_id, name='get_user_by_id'),

]
