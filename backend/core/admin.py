from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
from .forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.

    list_display = ('full_name', 'phone_number', 'email',
                    'gender', 'role', 'is_staff', 'is_superuser')

    list_editable = ('role', 'is_staff', 'is_superuser')
    # list_filter = ('is_admin',)
    fieldsets = (
        ('Account', {'fields': ('email', 'phone_number', 'password')}),
        ('Personal info', {'fields': ('full_name', 'gender', 'address')}),
        ('Permissions', {
         'fields': ('role', 'is_active', 'is_staff', 'is_superuser')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.

    add_fieldsets = (
        ('Account', {
         'fields': ('email', 'phone_number', 'password1', 'password2',)}),
        ('Personal info', {'fields': ('full_name', 'gender', 'address')}),
        ('Permissions', {
         'fields': ('role', 'is_active', 'is_staff', 'is_superuser',)}),
    )

    search_fields = ('email', 'phone_number', 'full_name')
    ordering = ('email', 'full_name')
    filter_horizontal = ()


admin.site.register(User, UserAdmin)

admin.site.register(Todos)


admin.site.unregister(Group)
