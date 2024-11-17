from django.db import models
import json

class Printer(models.Model):
    status = models.CharField(max_length=1, choices=(('1', 'ready'), ('2', 'busy'), ('3', 'offline')))
    model = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    allow_types = models.TextField(null=True) # JSON-serialized (text) version of your list

    # STORING
    # import json 
    # ...

    # myModel = MyModel()
    # listIWantToStore = [1,2,3,4,5,'hello']
    # myModel.myList = json.dumps(listIWantToStore)
    # myModel.save()

    # RETRIEVING 
    # jsonDec = json.decoder.JSONDecoder()
    # myPythonList = jsonDec.decode(myModel.myList)
