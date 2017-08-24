from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add = True, auto_now = False)
    updated = models.DateTimeField(auto_now_add = True, auto_now = False)
