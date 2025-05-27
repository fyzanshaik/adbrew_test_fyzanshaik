from bson import ObjectId

class TodoRepository:
    def __init__(self, db):
        self.collection = db.todos

    def list(self):
        todos = list(self.collection.find())
        for todo in todos:
            todo['_id'] = str(todo['_id'])
        return todos

    def create(self, description):
        result = self.collection.insert_one({'description': description, 'completed': False})
        return {
            '_id': str(result.inserted_id),
            'description': description,
            'completed': False
        }

    def delete(self, todo_id):
        return self.collection.delete_one({'_id': ObjectId(todo_id)})

    def update_completed(self, todo_id, completed):
        return self.collection.update_one({'_id': ObjectId(todo_id)}, {'$set': {'completed': completed}})

    def get(self, todo_id):
        todo = self.collection.find_one({'_id': ObjectId(todo_id)})
        if todo:
            todo['_id'] = str(todo['_id'])
        return todo
