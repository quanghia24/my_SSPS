# CNPM_HCMUT_SSPS
Welcome to our HCMUT_SSPS.

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
  git clone -b backend_main 
  mv my_SSPS backend_main
  cd backend_main
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
Install required libraries
```
pip install -r requirements.txt
```
We are conning to a database provider that is Aiven, with mySQL database, for security reason, all sensitive data were saved in an .env file. So in order to be able to connect with the server, you have to get yourself an Aiven account and create a server, set up an .env file inside backend/core/ folder (*the same folder with setting.py) with those attribute below, or setting it back to use mysql in your local machine, or just use the default sqlite3. It's up to you.
Email me at [nghia.truongquang@hcmut.edu.vn] if you were having problem with this.
```
DB_NAME=_______
DB_USER=_______
DB_PASSWORD=_______
DB_HOST=_______.aivencloud.com
DB_PORT=_______
```
Start up the server
```
python3 manage.py runserver
```

#### Setting up frontend
Open a terminal at a directory of your choice and enter these commands (change the folder name if you want to):
First you want to clone the backend repo with:
```
  git clone -b frontend_main 
  mv my_SSPS frontend_main
  cd frontend_main
  cd frontend
```

Next, install dependencies
```
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

