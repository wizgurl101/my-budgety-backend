CREATE TABLE dailytasks (
    id uuid,
    user_id uuid,
    date date,
    task1 integer,
    task2 integer,
);

INSERT INTO dailytasks VALUES (gen_random_uuid(), 'user_id', CURRENT_DATE, 0, 0);