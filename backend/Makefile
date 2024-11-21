enable:
	source .env/bin/activate
run:
	python3 manage.py runserver
help:
	python3 manage.py
migrate:
	python3 manage.py migrate
migrations:
	python3 manage.py makemigrations
start:
	django-admin startproject $(NAME)
create:
	python manage.py startapp $(APP_NAME)
user:
	python3 manage.py createsuperuser
password:
	python3 manage.py changepassword 
.PHONY: password user start migrations migrate help run enable