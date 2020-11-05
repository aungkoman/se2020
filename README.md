# Product Module for SE2020
SE2020 အတွက် Two Guy အဖွဲ့မှ ရေးသားနေသော module ဖြစ်ပါသည်။

### Backend Server Deployment Note
Project Source Code
https://github.com/aungkoman/se2020
 

### System Data
- OS : Ubuntu 20.04.1 LTS
- PHP version 7.4.10
- MySQL Server version 8.0.21-0
 
### Installation 
```
sudo apt-get install apache2
sudo apt-get install mysql-server
sudo apt-get install php libapache2-mod-php
```

Upload project source code to web root directory and install firebase/php-jwt library by composer.Type ```composer install``` in web root directory.

### Set Permission for upload folder
```
chown apache:apache -R upload/
chmod 755 -R upload/
```

### Database Server Setup
- Create a ```database user```, a ```database``` and give all privileges for that user.
- Import database schema from ```./dbschema/se2020 2020-11-02.sql```

Connecting with database server
Edit .htaccess file with newly created database server information such as database server host, database username, password and database name;

Finish.
We can test our deployment setup success or not by making api request as described in our api documentation.
API Documentation: https://documenter.getpostman.com/view/6000182/TVYGcxxz




