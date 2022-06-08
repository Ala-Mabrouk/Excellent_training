
--Roles Table
create table roles (
idRole int primary key,libelleRole varchar(50));

-- Users Table
create table users(
userId int primary key auto_increment,
userName varchar(30),
userLastName varchar(30),
userEmail varchar(200),
userPassword varchar(250),
userPhone varchar(20),
userRoleID int,
FOREIGN KEY (userRoleID) REFERENCES roles(idRole),
unique(userEmail)
);





-- Inserting data for testing 

insert into roles values(1, "participant");
insert into roles values(2, "Instructor");
insert into roles values(3, "Admin");

insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("ala","ben foulen","alabenfoulen@mail.com","123456","+21688552299",3);
insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("ali","ben foulen","alibenfoulen@mail.com","123456","+21688552299",2);
insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("sami","ben foulen","samibenfoulen@mail.com","123456","+21688552299",1);
