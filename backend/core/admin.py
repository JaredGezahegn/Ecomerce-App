from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = (
        (None, {'fields': ('username', 'email', 'first_name', 'last_name', 'address', 'city', 'state', 'phone', 'is_staff', 'is_active')}), 
)


admin.site.register(CustomUser, CustomUserAdmin)