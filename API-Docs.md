# AirBnB Clone

## Database Schema Design
<add image here once created>

## API Documentation

## User Authentication/Authorization

### All endpoints that require authentication

All endpoints that require a current user to be logged in

* Request
* Response (Error):
    * Status Code: 401
    * Headers: 
        * Content-Type: application/json

    * Body:
```json
{
    "message": "Authentication required",
    "statusCode": 401
}
```

All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the correct role(s) or permissions(s)

Request
Response (Error)
- Status Code: 403
- Headers: {"Content-Type": "application/json"}
Body: 
```json
{
    "message": "Forbidden"
}
```

## Get the Current User

Require Authentication: true

Request
Method:
URL:

Response
Status Code: 200
Headers: {
    "Content-Type": "application/json"
}



