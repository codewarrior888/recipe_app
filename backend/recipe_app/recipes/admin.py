from django.contrib import admin

from .models import Recipe
from categories.models import Category


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    model = Recipe, Category
    search_fields = ('title', 'description', 'ingredients', 'instructions')
    list_filter = ('category__name', 'created_at')
    list_display = ('title', 'id', 'category__name', 'category__id', 'created_at')
