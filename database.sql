CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL
);

CREATE TABLE "files" (
    "id" SERIAL PRIMARY KEY,
    "name" text,
    "path" text NOT NULL,
    "product_id" int
);

CREATE TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "category_id" int,
    "user_id" int,
    "name" text,
    "description" text,
    "old_price" int,
    "price" int,
    "quantity" int,
    "status" int,
    "created_at" timestamp DEFAULT (now()),
    "updated_at" timestamp DEFAULT (now())
);

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");


-- trigger to set the actual time when updated
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();