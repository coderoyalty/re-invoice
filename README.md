# re-Invoice

## How to run locally

```sh
docker build -t invoicely-postgres .
```

```sh
docker run -it --name invoicely-container -h localhost -p 5432:5432 -e POSTGRES_PASSWORD=invoicely invoicely-postgres
```

```sh
psql -h localhost -p 5432 -U invoicely_dev -d invoice_db
```

> check `.env.development` file.

Remember to copy your .env.development to .env file. This is because Prisma directly reads from the `.env` file.

> Unfortunately, Prisma doesn’t have a built-in flag to specify an environment file directly
