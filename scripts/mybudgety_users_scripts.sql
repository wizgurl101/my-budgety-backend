CREATE TABLE users (
    user_id uuid,
    email varchar(80)
);

INSERT INTO users VALUES (gen_random_uuid(), 'email@example.com');