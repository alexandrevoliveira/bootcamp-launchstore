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