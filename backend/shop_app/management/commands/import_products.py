from django.core.management.base import BaseCommand
import json
from shop_app.serializers import ProductSerializer

class Command(BaseCommand):
    help = 'Import products from JSON file'

    def handle(self, *args, **kwargs):
        with open('shop_app/json/products.json', 'r') as f:
            data = json.load(f)

        for item in data['products']:
            serializer = ProductSerializer(data=item)
            if serializer.is_valid():
                serializer.save()
                self.stdout.write(self.style.SUCCESS(f"Imported: {item['name']}"))
            else:
                self.stdout.write(self.style.ERROR(f"Error: {serializer.errors}"))