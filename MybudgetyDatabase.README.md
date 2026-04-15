# My Budgety Database

My Budgety database is a postgresql database use for the daily tasks service.

## Local Dev Setup

To set up the database locally:

1. Download postgresql on your machine.
   [Download Here](https://www.postgresql.org/download/)

2. Use the scripts in the scripts folder to create the needed tables (dailytasks and users).
   [Locate Here](/scripts/)

### Useful Postgresql Commands

login as a user

```bash
$ psql -U user_name
```

list all databases

```bash
postgres=# \l
```

Use a database and login as a user

```bash
$ psql -d database_name -U user_name
```

list all tables in a database

```bash
postgres=# \dt
```

show table schema

```bash
postgres=# \d table_name
```
