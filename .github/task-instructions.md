# Add visibility to the requests in the API

Right now, the API does not provide visibility into the requests being made. This task is to add logging or monitoring capabilities to track the requests.

Basically we need to display a line in the console for each requests that the API receives. That line will have:

* The status of the response
* The request method (GET, POST, etc.)
* The endpoint being accessed
* The time to process the request

If the request fails with a 500 error, we should also log the error message with the stack trace.



