### backend
1. setup your virtual environment
```
python3 -m venv .env
```

now activate the virtual environment (* depends on your system)
```
source .env/bin/active    (*only works on linux/mac)
.env\Scripts\activate.bat (*or)
.env\bin\Activate/ps1 (*or)
.. or you to find you self the way to activate it in your system
```
2. install required libraries
```
pip install -r requirements.txt
```
3. start up server
```
python3 manage.py runserver
```

