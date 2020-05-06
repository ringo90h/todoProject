FROM mysql:5.7

ENV MYSQL_DATABASE tododb

COPY ./query.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

CMD ["mysqld"]
