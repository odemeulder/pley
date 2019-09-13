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

## DataDog

I did a small POC to see how we can integrate metrics with this application.

I used this client: https://github.com/DataDog/dogstatsd-csharp-client
