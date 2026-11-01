-- Append this to the END of prisma/migrations/<timestamp>_init/migration.sql

-- TUPT ID format: TUPT-XX-XXXX (digits); required for everyone except ADMIN
ALTER TABLE "users" ADD CONSTRAINT "users_tuptid_format"
  CHECK ("tuptId" IS NULL OR "tuptId" ~ '^TUPT-[0-9]{2}-[0-9]{4}$');

ALTER TABLE "users" ADD CONSTRAINT "users_tuptid_required"
  CHECK ("role" = 'ADMIN' OR "tuptId" IS NOT NULL);

-- Subject code: PUBLIC => no code, PRIVATE => code required
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_code_by_visibility"
  CHECK (
    ("visibility" = 'PUBLIC'  AND "code" IS NULL) OR
    ("visibility" = 'PRIVATE' AND "code" IS NOT NULL)
  );

-- Cached like counter can never go negative
ALTER TABLE "articles" ADD CONSTRAINT "articles_likescount_nonneg"
  CHECK ("likesCount" >= 0);