# Create a new Owner

> ### Success cases

1. System receives an ***POST*** request at **/v0/owner** with the *Create DTO* in the Body
2. System checks if *Document* already exists
3. System creates a new *Document*
4. System creates a new *Owner* with the *Create DTO* and *Document*
5. System persists the *Owner* in the *Write Database*
6. System creates an **Repository DTO** with the response from *Write Database*
7. System persists the **Repository DTO** to the *Read Database*
8. System creates an *Response DTO* with the **Repository DTO** data
9. System returns an response with *Response DTO* in the body and status code *201 (created)*

> ### Exception - Error at Document already exists
1. System returns an error message with status code *400*

> ### Exception - Error at Document creation
1. System returns an error message with status code *400*

> ### Exception - Error at Owner creation
1. System returns an error message with status code *400*

> ### Exception - Error at persisting Owner to Write Database
1. System returns an error message with status code *500*

> ### Exception - Error at persisting Owner to Read Database
1. System returns an error message with status code *500*