import os
import datetime
from ninja import NinjaAPI
from django.contrib.auth.models import User
from .kc_auth import KCAuth
from .models import PlayerPlots, PlayerResources
from django.utils import timezone
import math

api = NinjaAPI(auth=KCAuth())

@api.get("/hello")
def hello(request):
    return "Hello world"

def get_player(request):
    player = User.objects.get(username=request.auth)
    return player

def list_player_plots(player):
    plots = PlayerPlots.objects.filter(user=player.id)
    json_plots = []
    for plot in plots:
        json_plots.append(plot.to_json())
    return json_plots

def get_player_plot_by_id_and_player(id, player):
    plot = PlayerPlots.objects.get(id=id, user=player.id)
    return plot

def get_player_resource_by_name_and_player(resource, player):
    playerresource = PlayerResources.objects.get(resource=resource, user=player.id)
    return playerresource


def list_player_resources(player):
    resources = PlayerResources.objects.filter(user=player.id)
    json_resources = []
    for resource in resources:
        json_resources.append(resource.to_json())
    return json_resources

@api.get("/state")
def get_state(request):
    player = get_player(request)

    json_plots = list_player_plots(player)
    json_resources = list_player_resources(player)
    
    return {
        "hello": "world",
        "auth": request.auth,
        "timestamp": datetime.datetime.now(),
        "plots": json_plots,
        "resources": json_resources
    }

@api.post("/plots/{id}/collect")
def post_plats_id_collect(request, id: int):
    player = get_player(request)
    plot = get_player_plot_by_id_and_player(id, player)
    now = timezone.now()
    delta = now - plot.last_collection
    diff_minutes = delta.total_seconds() / 60
    rpm = plot.building.rpm
    gathered_resources = min(plot.building.limit, math.floor(diff_minutes * rpm) )
    
    plot.last_collection = now
    plot.save()

    playerresource = get_player_resource_by_name_and_player(plot.building.resource, player)
    playerresource.amount = gathered_resources + playerresource.amount
    playerresource.save()



    return {
        "now": now,
        "last_collection": plot.last_collection,
        "diff": diff_minutes,
        "rpm": rpm,
        "gathered_resources": gathered_resources,
        "resource": plot.building.resource.name
    }


