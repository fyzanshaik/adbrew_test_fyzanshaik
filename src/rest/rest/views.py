from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']

class TodoListView(APIView):
    def get(self, request):
        todoCollection =db.todos
        todos_list = list(todoCollection.find())
        for todo in todos_list:
            todo['_id'] = str(todo['_id'])
        return Response(todos_list, status=status.HTTP_200_OK)

    def post(self, request):
        todos = db.todos
        description = request.data.get("description")

        if not description or not isinstance(description,str):
            return Response({
            'error':'Description is required and must be a string'
            }, status= status.HTTP_400_BAD_REQUEST)

        result = todos.insert_one({
            'description': description,
        })

        new_todo= {
            '_id' :str(result.inserted_id),
            'description': description,
        }
        return Response(new_todo, status=status.HTTP_201_CREATED)
