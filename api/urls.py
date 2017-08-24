from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^authors$', views.author_lists, name='author_lists'),
    url(r'^author/(?P<author_id>[0-9]+)$', views.author_detail, name='author_detail'),
   	url(r'^author/add$', views.author_add, name='author_add'),
    url(r'^author/edit$', views.author_edit, name='author_edit'),
    url(r'^author/delete/(?P<author_id>[0-9]+)$', views.author_delete, name='author_delete'),
]
