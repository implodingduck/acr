import os
import datetime
from ninja import NinjaAPI
from ninja.security import HttpBearer
from keycloak import KeycloakOpenID
from django.contrib.auth.models import User

keycloak_openid = KeycloakOpenID(server_url=os.environ.get("KC_ENDPOINT",""),
                                 client_id=os.environ.get("KC_CLIENT_ID",""),
                                 realm_name=os.environ.get("KC_REALM",""),
                                 client_secret_key=os.environ.get("KC_CLIENT_SECRET",""))

class KCAuth(HttpBearer):
    def authenticate(self, request, token):
        #print(token)
        #print(keycloak_openid.well_known())
        userinfo = keycloak_openid.userinfo(token)
        if userinfo:
            try:
                username = userinfo['preferred_username']
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                user = User(username=username, first_name=userinfo['given_name'], last_name=userinfo['family_name'], email=userinfo['email'])  # is_active defaults to True.
                user.is_staff = False
                user.is_superuser = False
                user.save()
            return user.get_username()