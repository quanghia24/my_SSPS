### backend
1. setup your virtual environment
```
python3 -m venv .env
source .env/bin/active    (*only works on linux/mac)
.env\Scripts\activate.bat (*or)
.. or you to find you self the way to activate it in your system
```
2. install required libraries
```
pip install -r requirements.txt
```
3. connect django with mySQL
```
port: 3306
create database my_ssps;
use my_ssps;
```
3. migrate models changes
```
python3 manage.py migrate
```
4. start up server
```
python3 manage.py runserver
```

