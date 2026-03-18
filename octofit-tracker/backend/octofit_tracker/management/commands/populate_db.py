from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users
        users = [
            User(name='Tony Stark', email='tony@marvel.com', team=marvel),
            User(name='Steve Rogers', email='steve@marvel.com', team=marvel),
            User(name='Bruce Wayne', email='bruce@dc.com', team=dc),
            User(name='Clark Kent', email='clark@dc.com', team=dc),
        ]
        for user in users:
            user.save()

        # Create Workouts
        workouts = [
            Workout(name='Push Ups', description='Upper body workout'),
            Workout(name='Running', description='Cardio workout'),
        ]
        for workout in workouts:
            workout.save()

        # Create Activities
        activities = [
            Activity(user=users[0], workout=workouts[0], duration=30),
            Activity(user=users[1], workout=workouts[1], duration=45),
            Activity(user=users[2], workout=workouts[0], duration=20),
            Activity(user=users[3], workout=workouts[1], duration=50),
        ]
        for activity in activities:
            activity.save()

        # Create Leaderboard
        Leaderboard.objects.create(user=users[0], score=100)
        Leaderboard.objects.create(user=users[1], score=90)
        Leaderboard.objects.create(user=users[2], score=80)
        Leaderboard.objects.create(user=users[3], score=95)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
