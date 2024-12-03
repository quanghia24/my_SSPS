# CNPM_HCMUT_SPSS
Welcome to our HCMUT_SPSS.

Have a look at our app [here](spss-frontend-1-n107ztocq-quanghias-projects.vercel.app)

![Guest's homepage](./doc/asset/guesthome.png)

## Overview
HCMUT_SSPS is a smart printing service for HCMUT students to use the printing facilities in HCMUT more efficiently. The students can use this system to pre-order their printing needs without having to wait in a line in traditional method. The system also provides a feature of storing your printing information, such as the metadata of the document, amount, date, time, location... of each of your order. Students can then view all the details of their system usage in the history.

The system is managed by the Student Printing Service Officer (SPSO). They are responsible for configuring the system, managing the printers and viewing the statistics and performance of the HCMUT_SSPS. SPSO can also view users' printing history.

## Technology Stack
- Front-end: ReactJS, Bootstrap, Tailwinds and other additional libraries provided by npm.
- Back-end: Django.
- Database: MySQL.

## Drawbacks
- Payment methods not integrated

## Installation
To use the application, you can follow the following steps:

### Clone the repository
#### Setting up backend
Open a terminal at a directory of your choice and enter these commands (change the folder name if you want to):
First you want to clone the backend repo with:
```
  cd backend  (*folder that has manage.py file)
```
Start with seting up your virtual environment
```
$ python3 -m venv .env
.. to startup the venv, the code depends heavily on your system

$ source .env/bin/active    (*only works on linux/mac)
$ .env\Scripts\activate.bat (*or)
$ .env\bin\Activated.ps1    (*or)
```

Install required libraries and start the app
```
pip install -r requirements.txt
python3 manage.py migrate 
python3 manage.py runserver
```

#### Setting up frontend
Open a terminal at a directory of your choice and enter these commands (change the folder name if you want to):
First you want to clone the backend repo with:
```
  cd frontend
  npm install
```
Then run the app with
```
npm start
```
You are ready now.

The application should be starting. The ReactJS application will run on http://localhost:3000
To log in as a student: (will take you to user site)
* Email: `nghia@hcmut.edu.vn`
* Password: `12345`

To log in as an admin: (will take you to a seperate admin panel)
* Username: `admin1@hcmut.edu.vn`
* Password: `12345`

You are now ready to explore our application!

## Contributors
This project is developed by a group of Computer Science students from Ho Chi Minh University of Technology (HCMUT). Our members of the team:
* 2212243 - Trương Quang Nghĩa
* 2213012 - Huỳnh Thanh Tâm
* 2213772 - Lê Đức Anh Tuấn
* 2212059 - Nguyễn Hồng Minh
* 2212432 - Lê Nguyễn Yến Nhi
* 2211368 - Nguyễn Phúc Hưng
* 2211363 - Lê Nguyễn Gia Hưng
* 2211806 - Dương Gia Lâm

