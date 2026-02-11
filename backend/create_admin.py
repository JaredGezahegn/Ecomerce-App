import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SHOPPIT.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

email = 'admin@shoppit.com'
password = 'admin'
username = 'admin_user'

print("--- CHECKING SUPERUSERS ---")
admins = User.objects.filter(is_superuser=True)

if admins.exists():
    print(f"Found {admins.count()} existing superuser(s):")
    for u in admins:
        print(f" - Email: {u.email} (Username: {u.username})")
    print("\nSince I cannot retrieve passwords, if you do not know them, I can create a new admin for you.")
    
    # Check if our default admin already exists to avoid conflict
    if not User.objects.filter(email=email).exists():
         print(f"Creating backup admin: {email} / {password}")
         User.objects.create_superuser(email=email, password=password, username=username)
    else:
         print(f"Note: User with email '{email}' already exists.")
else:
    print(f"No superusers found. Creating default admin...")
    try:
        User.objects.create_superuser(email=email, password=password, username=username)
        print("Superuser created successfully!")
        print(f"Email: {email}")
        print(f"Password: {password}")
    except Exception as e:
        print(f"Error creating superuser: {e}")
