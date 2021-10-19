CREATE DATABASE class_apparel;

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS profiles_id_seq;

-- Table Definition
CREATE TABLE "public"."profiles" (
    "id" int4 NOT NULL DEFAULT nextval('profiles_id_seq'::regclass),
    "forename" varchar(36) NOT NULL,
    "surname" varchar(36) NOT NULL,
    "email" varchar(50) NOT NULL,
    "password" text NOT NULL,
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS products_id_seq;

-- Table Definition
CREATE TABLE "public"."products" (
    "id" int4 NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    "title" text NOT NULL,
    "price" int4,
    "image_src" text,
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS newsletter_id_seq;

-- Table Definition
CREATE TABLE "public"."newsletter" (
    "id" int4 NOT NULL DEFAULT nextval('newsletter_id_seq'::regclass),
    "email" varchar(50) NOT NULL,
    PRIMARY KEY ("id")
);