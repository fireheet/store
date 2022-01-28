# Create a new user

> ### Success cases

1. System receives an ***PATCH*** request at **/v0/{ user_id }**
2. System validates authentication token
3. System checks if the email already exists
4. System creates an *update DTO* with the data
5. System updates the Write Database with the *update DTO* 
6. System creates an **repository DTO** with the response from Write Database
7.  System removes the current user from Read Database
8.  System adds the **repository DTO** to the Read Database
9.  System creates an *response DTO* with the **repository DTO**
10. System returns an response with *response DTO* and status code *200*

> ### Exception - Error at validating authentication token
1. System returns an error message with status code *400*

> ### Exception - Email exists
1. System returns an error message with status code *400*

> ### Exception - Error at updating user in Database
1. System returns an error message with status code *500*

> ### Exception - Error at removing user from Read Database
1. System returns an error message with status code *500*

> ### Exception - Error at adding user to Read Database
1. System returns an error message with status code *500*