CREATE TABLE dailytasks (
    id uuid,
    user_id uuid,
    date date,
    task1 integer CHECK (task1 IN (0, 1)),
    task2 integer CHECK (task2 IN (0, 1))
);

INSERT INTO dailytasks VALUES (gen_random_uuid(), 'user_id', CURRENT_DATE, 0, 0);