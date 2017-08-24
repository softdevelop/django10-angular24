#from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from api.models import Author
from django.forms.models import model_to_dict
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.decorators.csrf import csrf_exempt 
from django.http import QueryDict
import json

def index(request):
	return JsonResponse("index")


def author_lists(request):
	page = request.GET.get('page')
	itemsPerPage = request.GET.get('itemsPerPage')	or 10
	
	authors = (
		Author.objects.order_by('-created')
		.values('id','name','created')
	)

	#authors = Author.objects.order_by('-id')[:itemsPerPage]

	paginator = Paginator(authors, itemsPerPage)

	try:
		records = paginator.page(page)
	except PageNotAnInteger:
		# If page is not an integer, deliver first page.
		records = paginator.page(1)
	except EmptyPage:
		# If page is out of range (e.g. 9999), deliver last page of results.
		records = paginator.page(paginator.num_pages)

	previous_page_number = ''
	if records.has_previous():
		previous_page_number = records.previous_page_number()
	next_page_number = ''
	if records.has_next():
		next_page_number = records.next_page_number()

	obj_page = {
		'number' : records.number,
		'next_page_number' : next_page_number,
		'previous_page_number': previous_page_number,
		'start_index' : records.start_index(),
		'end_index' : records.end_index(),
	}
	response = {
		'result': 1,
		'data' : list(records.object_list),
		'total' : authors.count(), 
		'info' : obj_page,
	}
	return JsonResponse(response)


def author_detail(request, author_id):
	try:
		#author = Author.objects.values().get(pk=author_id)
		#author = Author.objects.values('id', 'name').get(pk=author_id)
		author = Author.objects.get(pk=author_id)
		if (request.POST.get('name') is None):
			response = {
				'result': 1,
				'data' : model_to_dict(author)
			}
		else:
			author.name = name
			author.save()
		
			response = {
				'result': 1,
				'message' : 'success'
			}
	except Author.DoesNotExist:
		response = "Author does not exist"
		
	return JsonResponse(response)


@csrf_exempt
def author_add(request):

	#token = request.POST.get('token')
	name = request.POST.get('name')

	try:
		checkAuthorName = Author.objects.get(name=name)
		response = {
			'result': 0,
			'message' : 'Blog exist'
		}
	except Author.DoesNotExist:
		author = Author(name = name)
		author.save()
		response = {
			'result': 1,
			'message' : 'success'
		}

	return JsonResponse(response)


@csrf_exempt
#def author_edit(request, author_id):
def author_edit(request):
	#data = QueryDict(request.body)
	data = request.PUT
	
	_id = int(data['id'])
	name = data['name']
	
	#_id = int(request.POST.get('id'))
	#name = request.POST.get('name')

	try:
		author = Author.objects.get(pk=_id)
		author.name = name
		author.save()
		
		response = {
			'result': 1,
			'message' : 'success'
		}
	except Author.DoesNotExist:
		response = {
			'result': 0,
			'message' : 'Error id'
		}

	return JsonResponse(response)
	

@csrf_exempt
def author_delete(request, author_id):
	#_id = int(request.POST.get('author_id'))
	_id = int(author_id)
	
	try:
		author = Author.objects.get(pk=_id)
		author.delete()
		
		response = {
			'result': 1,
			'message' : 'success'
		}
	except Author.DoesNotExist:
		response = {
			'result': 0,
			'message' : 'Error id'
		}

	return JsonResponse(response)
