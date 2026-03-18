import os
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'teams', views.TeamViewSet, basename='team')
router.register(r'workouts', views.WorkoutViewSet, basename='workout')
router.register(r'activities', views.ActivityViewSet, basename='activity')
router.register(r'leaderboard', views.LeaderboardViewSet, basename='leaderboard')


@api_view(['GET'])
def api_root(request, format=None):
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        base_url = f"https://{codespace_name}-8000.app.github.dev"
    else:
        base_url = "http://localhost:8000"

    return Response({
        'users': f'{base_url}/api/users/',
        'teams': f'{base_url}/api/teams/',
        'workouts': f'{base_url}/api/workouts/',
        'activities': f'{base_url}/api/activities/',
        'leaderboard': f'{base_url}/api/leaderboard/',
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
    path('', api_root, name='root'),
]
