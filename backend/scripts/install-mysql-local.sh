# use oficial mysql docker image when running linux
docker pull arm64v8/mysql:8.0
docker run -d -v mysql:/var/lib/mysql --name mysql_local -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 arm64v8/mysql:8.0


