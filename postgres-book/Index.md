# Indexes type in Postgres

## B-tree

General index type - the default if you don't specify an index method. It is also the only index method for primary keys and unique keys.

## BRIN

Block range index is designed specifically for very large tables where using B-tree would take up too much space and does not fit in memory.

## GiST

Generalized Search Tree is an index optimized for FTS, spatial data, scientific data, unstructured data and hierarchical data.

## GIN

Generalized Inverted Index is geared toward the built-in full text search and binary json data type of Postgres. It is a descendent of GiST but without the lossiness.

## Partial index

Using partial index with condition is more effective in some case because you only care about a relevant part of the database.

```SQL
CREATE TABLE subscribers(
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  type varchar(50),
  is_active boolean
)

CREATE UNIQUE INDEX uq ON subscribers using btree(lower(name)) WHERE is_active;
```

Another way is to use a view instead of a partial query.

```SQL
CREATE OR REPLACE VIEW
vw_subscribers_current AS SELECT id, lower(name) AS name FROM subscribers
WHERE is_active = true;
```

## Questions

Example of N+1 query:

We have an `items` and `categories` table.

We want to list items and their respective categories.
Get the items
`SELECT * FROM items`
Then we fetch the categories
`SELECT id, name FROM items WHERE categories_id = :categories_id ORDER BY name`
-> This will generate 18 queries if we have 17 categories.
To refactoring this, we use a JOIN clause:

```sql
SELECT
      c.id AS category_id,
      c.name AS category_name,
      i.id AS item_id,
      i.name AS item_name
  FROM categories c
  LEFT JOIN items i ON c.id = i.category_id
  ORDER BY c.name, i.name;
```

## Foreign key

Foreign key can initially marked as NOT VALID so that it does not prevent write to the DB.

```sql
ALTER TABLE pt ADD CONSTRAINT pt_ft_fkey FOREIGN KEY ( ftval ) REFERENCES ft(fk) NOT VALID;
ALTER TABLE;
```

And then later modified the foreign key so that it doesn't prevent write during the transformation.

steps to alter table so that it doesn't can transform from not valid fk to a valid fkey.

```sql
ALTER TABLE pt ADD CONSTRAINT ftval_not_nul CHECK (ftval IS NOT NULL) NOT VALID;
// second step
ALTER TABLE pt VALIDATE CONSTRAINT ftval_not_null;
// third step
ALTER TABLE pt ALTER COLUMN ftval SET NOT NULL;
```
