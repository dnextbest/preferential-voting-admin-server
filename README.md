curl -X GET -H "Content-Type: application/json" http://localhost:8000/api/voteDefs?pageSize=2&page=2



curl -X GET -H "Content-Type: application/json" http://localhost:8000/api/voteDefs/5408fbbc4bee8b5641efc651

Response:
    {
       "description": "test",
       "email": "sadsad",
       "fields":
       [
           {
               "id": 1,
               "value": "Option one .."
           },
           {
               "id": 2,
               "value": "Option two .."
           }
       ],
       "dateCreated": 1409874876233,
       "_id": "5408fbbc4bee8b5641efc651"
    }



curl -X POST -H "Content-Type: application/json" -d '{"description":"test", "email": "sadsad", "fields": [{"id": 1, "value": "Option one .."},{"id": 2, "value": "Option two .."}]}' http://localhost:8000/api/voteDefs

Response:
    {
       "description": "test",
       "email": "sadsad",
       "fields":
       [
           {
               "id": 1,
               "value": "Option one .."
           },
           {
               "id": 2,
               "value": "Option two .."
           }
       ],
       "dateCreated": 1409874876233,
       "_id": "5408fbbc4bee8b5641efc651"
    }

curl -X PUT -H "Content-Type: application/json" -d '{"description":"updated test", "email": "sadsad", "fields": [{"id": 1, "value": "Option one .."},{"id": 2, "value": "Option two .."},{"id": 3, "value": "Option three .."}]}' http://localhost:8000/api/voteDefs

Response - updated object:
{"description":"updated test", "email": "sadsad", "fields": [{"id": 1, "value": "Option one .."},{"id": 2, "value": "Option two .."},{"id": 3, "value": "Option three .."}]}
