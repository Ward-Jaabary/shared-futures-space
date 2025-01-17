from django.views.generic import TemplateView
from map.markers import case_study_marker, river_marker
from remix.models import RemixIdea
from resources.models import CaseStudy, HowTo
from river.models import River


class MapView(TemplateView):
    template_name = "map/map.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["home"] = None

        if self.request.user.is_authenticated:
            area = self.request.user.post_code.area
            if area.location:
                context["home"] = {
                    "center": area.location.coords,
                    "zoom": area.zoom,
                }

        rivers = River.objects.exclude(location=None)
        markers = []
        for river in rivers:
            marker = river_marker(river)
            if marker:
                markers.append(marker)

        for idea in RemixIdea.objects.exclude(location=None):
            marker = idea.marker
            if marker:
                markers.append(marker)

        for case_study in CaseStudy.objects.exclude(location=None):
            marker = case_study_marker(case_study)
            if marker:
                markers.append(marker)

        for how_to in HowTo.objects.exclude(location=None):
            marker = case_study_marker(how_to)
            if marker:
                markers.append(marker)

        context["markers"] = markers
        return context
