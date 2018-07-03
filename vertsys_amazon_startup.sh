# install glassfish
sudo yum remove java-1.7.0-openjdk
sudo yum install java-1.8.0-openjdk-devel
wget http://download.oracle.com/glassfish/5.0/release/glassfish-5.0-web.zip
unzip glassfish-5.0-web.zip

# install git and load repos
sudo yum install git
git clone https://github.com/Alexx882/DistSys_HotelRoomReservation_Server

# copy webpage from project
cp -a ~/DistSys_HotelRoomReservation_Server/out/artifacts/DistSys_HotelRoomReservation_war_exploded/. ~/glassfish5/glassfish/domains/domain1/docroot/

# start glassfish and deploy REST service
~/glassfish5/bin/asadmin

# asadmin> start-domain
# asadmin> deploy DistSys_HotelRoomReservation_Server/out/artifacts/DistSys_HotelRoomReservation_war_exploded
# asadmin> deploy out/artifacts/DistSys_HotelRoomReservation_war_exploded
# asadmin> exit

# setup database and admin user
sudo yum install mysql
sudo yum install mysql-server
sudo service mysqld start
mysqladmin -u root password '12345'
mysql -u root -h localhost -p
# mysql> CREATE USER 'root'@'%' IDENTIFIED BY '12345';
# mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'
#    -> WITH GRANT OPTION;
