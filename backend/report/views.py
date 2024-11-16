from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.utils.dateparse import parse_datetime
from rest_framework.decorators import api_view

import json
from .models import Report, User

@csrf_exempt
@api_view(['POST', 'GET', 'PUT', 'DELETE'])
def report_view(request):
    if request.method == 'GET':
        # Get all reports
        reports = Report.objects.all()
        report_list = [
            {
                'id': report.id,
                'title': report.title,
                'content': report.content,
                'rating': report.rating,
                'date_created': report.date_created,
                'user_id': report.user.user_id,
            } for report in reports
        ]
        return JsonResponse({'reports': report_list}, safe=False)

    elif request.method == 'POST':
        # Create a new report
        data = json.loads(request.body)
        try: 
            user = get_object_or_404(User, user_id=data['user_id'])  # Ensure the user exists
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        
        try:
            report = Report.objects.create(
                title=data['title'],
                content=data['content'],
                rating=data['rating'],
                user=user
            )
            return JsonResponse({
                'id': report.id,
                'title': report.title,
                'content': report.content,
                'rating': report.rating,
                'date_created': report.date_created,
                'user_id': report.user.user_id,
            }, status=201)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)

    elif request.method == 'PUT':
        # Update an existing report
        try:
            data = json.loads(request.body)
            report = get_object_or_404(Report, id=data['id'])
            if 'title' in data:
                report.title = data['title']
            if 'content' in data:
                report.content = data['content']
            if 'rating' in data:
                report.rating = data['rating']
            if 'date_created' in data:
                report.date_created = parse_datetime(data['date_created'])

            report.save()
            return JsonResponse({
                'id': report.id,
                'title': report.title,
                'content': report.content,
                'rating': report.rating,
                'date_created': report.date_created,
                'user_id': report.user.user_id,
            }, status=200)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Report not found'}, status=404)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)

    elif request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            report = Report.objects.get(id=data['id'])
            report.delete()
            return JsonResponse({'message': 'Report deleted successfully'}, status=204)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Report not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
