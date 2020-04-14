# pley

Study project using dotnet core, react, postgres, Yelp style application.

## pre-requisites

You need to have postgres running. 

The following command will launce the application locally:

```bash
dotnet run
```

## secrets

For development, you can use the built in secrets dev tool.

```bash
# list all the secrets
dotnet user-secrets list
# set a secret
dotnet user-secrests add <key> <secret>
```

The two secrets needed to run this app are `JwtSecret`, a 256 bit string for JWT, and `DbConn`, the connection string to the postgres DB.

## database

When first running, you would need to run the migration.

``` 
dotnet ef database update
```

The database will be seeded with one user, with the login `admin@example.com` and password `password`.

### Migrating db changes to production.

I set up an RDS database in AWS.

I could not find a good way to push ef migrations to prd. I could create a script, using this command, and subsequently execute the script agains the prd database.

```
dotnet ef migrations script -o scripts/2020-04-12-a.sql
'/Applications/Postgres.app/Contents/Versions/9.3/bin'/psql --host pley.c0hsbt7jwzl0.us-east-1.rds.amazonaws.com  -p5432 --user postgres
```
