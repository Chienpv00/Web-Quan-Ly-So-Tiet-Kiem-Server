# Install
>**Require**: nodejs, git, mysql
```
$ git clone https://github.com/Chienpv00/Web-Quan-Ly-So-Tiet-Kiem-Server.git
$ npm install

- Tạo tài khoản mysql - tạo tài khoản mới : 
    1. create user 'sqluser'@'%' identified with mysql_native_password by 'password';
    2.GRANT ALL PRIVILEGES ON *.* TO 'sqluser'@'%';
    3. FLUSH PRIVILEGES;

- Tạo file .env 
*** 
PORT = 4000
USER = "sqluser" 
PASSWORD = "password"  (mật khẩu user)
***

$ npm start
link: localhost:4000/graphql
```
>**Testing:** [studio.apollographql.com](https://studio.apollographql.com/)

# Architecture

![](./public/Ki%E1%BA%BFn%20tr%C3%BAc%20h%E1%BB%87%20th%E1%BB%91ng.drawio.png)