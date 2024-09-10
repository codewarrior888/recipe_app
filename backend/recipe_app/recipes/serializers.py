from rest_framework import serializers
from .models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='slug', read_only=True)
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'ingredients', 'category', 'created_at', 'image', 'instructions', 'category', 'preview']
    
    def preview(self, obj):
        return obj.preview()