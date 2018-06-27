[![Build Status](https://travis-ci.com/stariel/13-object-relational-mapping.svg?branch=master)](https://travis-ci.com/stariel/13-object-relational-mapping)
 13: Single Resource Mongo and Express API
===

This server uses mongoDB and mongoose to create a database of albums using the following server endpoints:

## Server Endpoints
### `/api/v1/albums`
* `POST` request
  * passes data as stringifed JSON in the body of a post request to create a new resource
### `api/v1/albums`
* `GET` request
* Fetches all resources
### `/api/v1/albums/:id`
* `GET` request
  * passes the id of a resource through the url endpoint to get a resource
    * **this should use `req.params`, not querystring parameters**
* `PUT` request
  * passes data as stringifed JSON in the body of a put request to overwrite a pre-existing resource
* `DELETE` request
  * passes the id of a resource though the url endpoint to delete a resource
    * **this should use `req.params`**
