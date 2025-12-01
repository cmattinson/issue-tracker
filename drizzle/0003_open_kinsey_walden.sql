CREATE TABLE "issue_priorities" (
    "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY(
        SEQUENCE name "issue_priorities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START
        WITH
            1 CACHE 1
    ),
    "name" varchar(255) NOT NULL,
    CONSTRAINT "issue_priorities_name_unique" UNIQUE ("name")
);
