from django.db import models
from categories.models import Category
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema_field


class Recipe(models.Model):
    title = models.CharField(max_length=128)
    description = models.TextField(max_length=200)
    ingredients = models.TextField(blank=True, null=True)
    instructions = models.TextField(blank=True, null=True)
    image = models.ImageField(default='recipes/Default.jpg', upload_to="recipes", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    category = models.ForeignKey(Category, related_name='recipes', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    @extend_schema_field(int)
    def get_absolute_url(self):
        return f"/recipes/{self.id}/"
    
    def get(self, request, pk):
        recipe = Recipe.objects.get(pk=pk)
        image_url = recipe.image.url
        return Response({'image_url': image_url})
    
    @extend_schema_field(str)
    def preview(self):
        words = self.description.split(" ")
        preview = " ".join(words[:15])
        return f"{preview}..."
    
    class Meta:
        app_label = "recipes"
        verbose_name = "Recipe"
        verbose_name_plural = "Recipes"
        ordering = ["title"]
