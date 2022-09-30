# pyre-strict
from django.http.request import HttpRequest
from django.http import HttpResponse

from .models import HowTo, CaseStudy, FoundUseful
from django.shortcuts import render
from apps.core.utils.tags_declusterer import objects_tags_cluster_list_overwrite, single_object_tags_cluster_overwrite
from itertools import chain

from analytics.models import log_resource_access  # pyre-ignore[21]

from django.db.models import Q
from typing import List, Optional


def resource(request: HttpRequest) -> HttpResponse:
    resources = retrieve_and_chain_resources()
    context = {'resources': resources}
    return render(request, 'resources/resources.html', context)


# with argument as a separate url and view
def resource_tag(request: HttpRequest, tag: str) -> HttpResponse:
    resources = retrieve_and_chain_resources()
    context = {'resources': resources,
               'tag': tag}
    return render(request, 'resources/resources.html', context)


def resource_search(request: HttpRequest) -> HttpResponse:
    search_text = request.POST.get('search')

    results = filter_and_cluster_resources(search_text)
    context = {'results': results}
    return render(request, 'resources/partials/search_results.html', context)


def retrieve_and_chain_resources() -> List:  # pyre-ignore[24]
    how_tos = objects_tags_cluster_list_overwrite(HowTo.objects.all())
    case_studies = objects_tags_cluster_list_overwrite(CaseStudy.objects.all())
    return list(chain(how_tos, case_studies))


def filter_and_cluster_resources(search_term: Optional[str]) -> List:  # pyre-ignore[24]
    how_tos = HowTo.objects.filter(Q(title__icontains=search_term)
                                   | Q(summary__icontains=search_term)
                                   | Q(tags__name__icontains=search_term)).distinct()

    case_studies = CaseStudy.objects.filter(Q(title__icontains=search_term)
                                            | Q(summary__icontains=search_term)
                                            | Q(tags__name__icontains=search_term)).distinct()
    # can iterate over tags only after filtering
    how_tos = objects_tags_cluster_list_overwrite(how_tos)
    case_studies = objects_tags_cluster_list_overwrite(case_studies)
    return list(chain(how_tos, case_studies))


# single resource item
def resource_item(request: HttpRequest, slug: Optional[str]) -> HttpResponse:
    current_resource = None
    try:
        current_resource = HowTo.objects.get(slug=slug)
    except HowTo.DoesNotExist:
        try:
            current_resource = CaseStudy.objects.get(slug=slug)
        except CaseStudy.DoesNotExist:
            print('it is neither HowTo nor CaseStudy. Redirect to root url?')
    # resource_instance = single_object_tags_cluster_overwrite(current_resource).al
    # useful = current_resource.prefetch_related('useful')
    current_user = request.user
    useful_instance = None
    try:
        useful_instance = FoundUseful.objects.get(useful_resource=current_resource, found_useful_by=current_user)
    except:
        print('does not exist')
    context = {
        'resource': single_object_tags_cluster_overwrite(current_resource),
        'useful': useful_instance,
    }

    if request.user.is_authenticated:
        log_resource_access(current_resource, request.user)

    return render(request, 'resources/resource_item.html', context)


def resource_found_useful(request: HttpRequest, res_id: Optional[int]) -> HttpResponse:
    print('here')
    resource_id = res_id
    print(resource_id)
    current_user = request.user
    current_resource = None


    try:
        current_resource = HowTo.objects.get(pk=res_id)
        # is_how_to = True
    except HowTo.DoesNotExist:
        try:
            current_resource = CaseStudy.objects.get(pk=res_id)
        except CaseStudy.DoesNotExist:
            return render(request, 'partials/button-hx.html')

    useful_instance = None
    try:
        useful_instance = FoundUseful.objects.get(useful_resource=current_resource, found_useful_by=current_user)
        print(useful_instance)

        useful_instance.delete()
        print('deleted')
    except FoundUseful.DoesNotExist:
        print('no useful match')
        FoundUseful.objects.create(useful_resource=current_resource,
                                                     found_useful_by=current_user)


    print('done')

    context = {
        'resource_id': res_id
    }

    return render(request, 'partials/button-hx.html', context)
