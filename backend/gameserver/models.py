from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Resource(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50, blank=True)
    icon_ref = models.CharField(max_length=50, blank=True)
    limit = models.IntegerField()

    def __str__(self):
        return self.name



class Building(models.Model):
    name = models.CharField(max_length=50)
    resource = models.ForeignKey(Resource, on_delete=models.SET_NULL, blank=True, null=True)
    limit = models.IntegerField()
    rpm = models.IntegerField()

    def __str__(self):
        return self.name


class PlayerPlots(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.IntegerField()
    building = models.ForeignKey(Building, on_delete=models.SET_NULL, blank=True, null=True)
    last_collection = models.DateTimeField()
    created_date = models.DateTimeField()

    def to_json(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "location": self.location,
            "building": {
                "name": self.building.name,
                "resource": self.building.resource.name
            },
            "last_collection": self.last_collection,
            "created_date": self.created_date
        }

class PlayerResources(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    amount = models.IntegerField()

    def to_json(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "resource": self.resource.name,
            "amount": self.amount
        }