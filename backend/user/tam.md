# User and JWT


#### Things I have done in these files:
Permission is the token access, put it in Postman/Authorization(AuthType Bearer Token) in the Token Box  
Body is the JSON script like usual



    - models.py:  
I created like EERD files, nothing special  
    use python3 mangage.py createsuperuser to create admin user  
use Postman or ThunderClient or simple text in the browser at http://127.0.0.1:8000/api/users/register/
{
"email":"abc@gmail.com",
"username":"abc",
"password":"abc"
} to create user
    - serializers.py: nothing speacial  
  

    - urls.py:
http://127.0.0.1:8000/api/users/ + ...  
'': return all the users, need admin permission
'register': uses to create user, no permissions needed    
"login": uses to login, no permissions needed  
"token/refresh": uses to refresh the token, no permissions needed  
"balance": gets the balance, no permissions needed  
"delete"": deletes the user, admin permission  

    -views.py
  
-UserView:   
[PATCH] Update the needed updating fields, return none if put nothing (authenticated needed)  
-BalanceView:  
[GET] Returns the balance of the input email, if the email is None return error message (no permissions needed)   
-AllusersView:   
[GET] Returns all users if request body is empty, else return specific user (need user_id or email) (admin permission)  
[PATCH] Updates specific user fields, email required (admin permission)  
-DeleteView: 
[DELETE] Delete the specific user with email, email required (admin permission)






