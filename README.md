# Musical Instrument Inventory App

An app to manage inventory at a musical instrument store.


## Prerequisites

* Node JS installed.
* A running Mongo DB instance.


## Connecting to a database

To connect to your desired Mongo DB instance, do the following:

1. Create a file called `db_conn_info/db_conn_info.json`. *This file will not be tracked by git.*
2. In the `db_conn_info/` directory, copy the contents from the `db_conn_info.sample.json` file
to your newly created `db_conn_info.json` file. Change placeholder values to the real database
connection values.


## Create a Mongo Collection

With your Mongo DB instance running, do the following to create the collection needed for this app:

1. In your terminal, run `mongosh mongodb+srv://<username>:<password>@<hostname>`. This will log you 
into your Mongo DB instance.
2. Create the collection needed for this app: `db.createCollection("musical_instruments")`.


## Test your connection to MongoDB

You can test the connection to MongoDB by running the following command:

```bash
npm run test-connection
```

## Seed your data models

Before running the app, you should seed your data models. This will populate Mongo DB with some initial data.

```bash
npm run seed
```


## Run your server

Now you can run the app:

```bash
npm run start
```

*Take a look at http://localhost:8000/*



