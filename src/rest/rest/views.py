from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from pymongo import MongoClient
from .todo_repository import TodoRepository

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
repo = TodoRepository(db)

class TodoListView(APIView):
    def get(self, request):
        return Response(repo.list(), status=status.HTTP_200_OK)

    def post(self, request):
        description = request.data.get("description")
        if not description or not isinstance(description, str):
            return Response({'error': 'Description is required and must be a string'}, status=status.HTTP_400_BAD_REQUEST)
        new_todo = repo.create(description)
        return Response(new_todo, status=status.HTTP_201_CREATED)

class TodoDetailView(APIView):
    def delete(self, request, todo_id):
        result = repo.delete(todo_id)
        if result.deleted_count == 0:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'message': 'Todo deleted'}, status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, todo_id):
        completed = request.data.get('completed')
        if completed is None or not isinstance(completed, bool):
            return Response({'error': 'Completed must be a boolean'}, status=status.HTTP_400_BAD_REQUEST)
        result = repo.update_completed(todo_id, completed)
        if result.matched_count == 0:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        updated_todo = repo.get(todo_id)
        return Response(updated_todo, status=status.HTTP_200_OK)
