CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

CREATE TABLE "Users" (
    "Id" serial NOT NULL,
    "CreatedOn" timestamp without time zone NOT NULL,
    "ModifiedOn" timestamp without time zone NOT NULL,
    "FirstName" text NULL,
    "LastName" text NULL,
    "Email" text NULL,
    "Type" integer NOT NULL,
    "PasswordHash" bytea NULL,
    "PasswordSalt" bytea NULL,
    CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
);

CREATE TABLE "Restaurants" (
    "Id" serial NOT NULL,
    "CreatedOn" timestamp without time zone NOT NULL,
    "ModifiedOn" timestamp without time zone NOT NULL,
    "OwnerId" integer NULL,
    "RestaurantName" text NULL,
    "AverageRating" integer NOT NULL,
    "Street" text NULL,
    "State" text NULL,
    "Zip" text NULL,
    "City" text NULL,
    CONSTRAINT "PK_Restaurants" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Restaurants_Users_OwnerId" FOREIGN KEY ("OwnerId") REFERENCES "Users" ("Id") ON DELETE RESTRICT
);

CREATE TABLE "Reviews" (
    "Id" serial NOT NULL,
    "CreatedOn" timestamp without time zone NOT NULL,
    "ModifiedOn" timestamp without time zone NOT NULL,
    "ReviewerId" integer NULL,
    "RestaurantId" integer NULL,
    "VisitDate" timestamp without time zone NOT NULL,
    "CustomerReview" text NULL,
    "OwnerReply" text NULL,
    "Rating" smallint NOT NULL,
    CONSTRAINT "PK_Reviews" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Reviews_Restaurants_RestaurantId" FOREIGN KEY ("RestaurantId") REFERENCES "Restaurants" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_Reviews_Users_ReviewerId" FOREIGN KEY ("ReviewerId") REFERENCES "Users" ("Id") ON DELETE RESTRICT
);

CREATE INDEX "IX_Restaurants_OwnerId" ON "Restaurants" ("OwnerId");

CREATE INDEX "IX_Reviews_RestaurantId" ON "Reviews" ("RestaurantId");

CREATE INDEX "IX_Reviews_ReviewerId" ON "Reviews" ("ReviewerId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20190524135110_InitialCreate', '2.2.4-servicing-10062');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20190525154911_RestaurantReviews', '2.2.4-servicing-10062');

