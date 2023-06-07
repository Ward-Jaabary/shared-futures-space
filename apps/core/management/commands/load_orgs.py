from django.core.management.base import BaseCommand
from userauth.models import Organisation

# TEMP: just to quickly insert organisations


class Command(BaseCommand):
    help = "Load Organisations"

    def handle(self, *args, **kwargs):
        Organisation.objects.all().delete()
        orgs_names = [
            "Belfast Interface River",
            "Cooperation Ireland",
            "SEUPB",
            "Animorph",
            "Darwin Awards",
        ]

        if not Organisation.objects.count():
            for org_name in orgs_names:
                Organisation.objects.create(name=org_name)
