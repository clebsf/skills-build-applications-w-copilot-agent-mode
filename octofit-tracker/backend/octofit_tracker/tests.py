
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Workout, Activity, Leaderboard

class APIRootTest(APITestCase):
	def test_api_root(self):
		url = reverse('api-root')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class UserTests(APITestCase):
	def setUp(self):
		self.team = Team.objects.create(name='Test Team')
		self.user = User.objects.create(name='Test User', email='test@example.com', team=self.team)

	def test_list_users(self):
		url = reverse('user-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class TeamTests(APITestCase):
	def test_list_teams(self):
		Team.objects.create(name='Test Team')
		url = reverse('team-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class WorkoutTests(APITestCase):
	def test_list_workouts(self):
		Workout.objects.create(name='Test Workout', description='desc')
		url = reverse('workout-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class ActivityTests(APITestCase):
	def setUp(self):
		self.team = Team.objects.create(name='Test Team')
		self.user = User.objects.create(name='Test User', email='test@example.com', team=self.team)
		self.workout = Workout.objects.create(name='Test Workout', description='desc')
		self.activity = Activity.objects.create(user=self.user, workout=self.workout, duration=10)

	def test_list_activities(self):
		url = reverse('activity-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class LeaderboardTests(APITestCase):
	def setUp(self):
		self.team = Team.objects.create(name='Test Team')
		self.user = User.objects.create(name='Test User', email='test@example.com', team=self.team)
		self.leaderboard = Leaderboard.objects.create(user=self.user, score=100)

	def test_list_leaderboard(self):
		url = reverse('leaderboard-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
