-- User info
INSERT INTO users (id, first_name, last_name, email, password, country_code, region_code, city)
VALUES(DEFAULT, 'wiz', 'gurl', 'wiz@gurl.com', 'invalid_pw', 'ca', 'ab', 'calgary');

-- report info
INSERT INTO report (id, user_id, name, month_name, year, border_color, budget, type)
VALUES(DEFAULT, 1, 'membership & subscription', 'march', 2022, 'green', 150, 'expense'); 

-- report item info
INSERT INTO report_item(id, report_id, name, amount)
VALUES(DEFAULT, 2, 'calgary climbing center', 70.35);