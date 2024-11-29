from django.contrib import admin

# Register your models here.
from .models import Resource, Building, PlayerPlots, PlayerResources

admin.site.register(Resource)
admin.site.register(Building)
admin.site.register(PlayerPlots)
admin.site.register(PlayerResources)
