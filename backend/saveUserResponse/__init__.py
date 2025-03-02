import azure.functions as func
import pymongo
import json
import os

COSMOS_CONNECTION_STRING = "YOUR_COSMOS_DB_CONNECTION_STRING"

client = pymongo.MongoClient(COSMOS_CONNECTION_STRING)
db = client["DigitalAssessmentDB"]
collection = db["UserResponses"]

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        user_data = req.get_json()
        collection.update_one({"userId": user_data["userId"]}, {"$set": user_data}, upsert=True)
        return func.HttpResponse(json.dumps({"status": "Saved!"}), mimetype="application/json")
    except Exception as e:
        return func.HttpResponse(str(e), status_code=500)
