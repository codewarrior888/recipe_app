from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecipeListByCategoryViewSet, RecipeDetailViewSet

router = DefaultRouter()
router.register(r'recipes', RecipeDetailViewSet, basename='recipes')

urlpatterns = [
    path('', include(router.urls)),
    path('categories/<slug:category_slug>/recipes/', RecipeListByCategoryViewSet.as_view({'get': 'list'}), name='recipes_by_category'),
]