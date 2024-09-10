from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=128, unique=True, db_index=True)
    slug = models.SlugField(max_length=128, unique=True, blank=True)
    image = models.ImageField(default='recipes/Default.jpg', upload_to='recipes/', blank=True, null=True)

    def __str__(self):
        return self.name
    
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return response

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return f'/categories/{self.slug}/'

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ["name"]