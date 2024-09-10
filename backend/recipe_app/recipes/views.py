from rest_framework import viewsets, routers
from .models import Recipe
from .serializers import RecipeSerializer


class RecipeListByCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RecipeSerializer
    
    def get_queryset(self):
        category_slug = self.kwargs['category_slug']
        return Recipe.objects.filter(category__slug=category_slug)


class RecipeDetailViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
