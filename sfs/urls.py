# pyre-strict
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.urls import include, path
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from search import views as search_views

from typing import List, Union
from django.urls import URLResolver, URLPattern
from userauth.views import check_email, check_display_name # pyre-ignore[21]

urlpatterns: List[Union[URLResolver, URLPattern]] = [
    # pyre comment suppresses an error caused by pyre's limited understanding of django
    path('django-admin/', admin.site.urls),  # pyre-ignore[16]

    path('admin/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),

    path('search/', search_views.search, name='search'),
    path('account/', include('userauth.urls')),
    path('dashboard/', include('dashboard.urls'), name='dashboard'),
    path('projects/', include('project.urls')),
    path('action/', include('action.urls')),

    path('', include('landing.urls')),
]

htmx_urlpatterns: List[Union[URLResolver, URLPattern]] = [
    path('check_email/', check_email, name='check_email'),
    path('check_display_name/', check_display_name, name='check_display_name'),
]

urlpatterns += htmx_urlpatterns

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    import debug_toolbar

    # Serve static and media files from development server
    MIDDLEWARE_CLASSES = ['debug_toolbar.middleware.DebugToolbarMiddleware', ]
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]

urlpatterns = urlpatterns + [
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:

    path("", include(wagtail_urls)),

    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    path("pages/", include(wagtail_urls)),
]
