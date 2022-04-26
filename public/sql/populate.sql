INSERT INTO personal (id, first_name, last_name, CF, phone) VALUES
(1, "Balzo", "Federico", "DBSFDSGL781VSDFD", "3934435345");

INSERT INTO enterprise (id, business_name, P_IVA, phone) VALUES 
(1, "ESEP", "AEZ1324BBLC", "0453294329");

INSERT INTO account (id, email, password, type, personal_id, enterprise_id) VALUES 
-- ACCOUNT DI ESEP E DEI SUOI DIPENDENTI --
(1, "dicesaredaniele@gmail.com", "$2y$10$oJ0V6sJZd7jRyBTHzNZ6U.9ra3tj7qkRTS3U8Y.7B.I.ZWdo6G8Z6", "enterprise", NULL, 1),
(2, "esep.payments@gmail.com", "$2y$10$rIYVhK01dIvtbzP2/R4KzejiP7cInKdjx7flCNyawABLNQy01aDhm", "enterprise", NULL, 1),
-- ACCOUNT BALZO --
(3, "balzofederico@gmail.com", "$2y$10$G46DvNQjiSvrfMFs5rtZxe0wgfEwTyrXgJIAszGO7I/i/gkqCzKwG", "personal", 1, NULL);

INSERT INTO site (id, site, city, CAP, apartment_n, personal_id, enterprise_id) VALUES 
-- CASA BALZO --
(1, "Via Brombeis", "Napoli", "43572", 0, 1, NULL),
(2, "Via Mazzini", "Verona", "37138", 5, 1, NULL),
-- AZIENDE ESEP --
();

INSERT INTO meter (id, id_site, utility) VALUES 
-- CONTATORI BALZO --
(1, 1, "GAS"),
(2, 1, "EE"),
(3, 2, "GAS"),
(4, 2, "EE"),
-- CONTATORI AGENZIA ESEP --
();

INSERT INTO supply (id, offer, utility, voltage, contractual_power_treshold, max_power_treshold, fixed_costs, F1, F2, F3, gas, supplier) VALUES 
(1, "MEGA OFFERTONA GASante",   "GAS",  NULL,   NULL,   NULL,   20.0,   NULL,   NULL,   NULL,   1.2,    "ENEL"),
(2, "OFFERTA ELETTRIZANTE",     "EE",   200,    3.5,    4.0,    18.0,   0.250,  0.270,  0.250,  NULL,   "ENEL"),
(3, "GAS SCONTATO SOLO PER TE", "GAS",  NULL,   NULL,   NULL,   21.0,   NULL,   NULL,   NULL,   1.1,    "PUTIN"),
(4, "EE++",                     "EE",   300,    4.0,    4.5,    24.0,   0.300,  0.350,  0.350,  NULL,   "ENI"),
(5, "SUPER GAS",                "GAS",  NULL,   NULL,   NULL,   40.0,   NULL,   NULL,   NULL,   1.4,    "QUALITY GAS"),
(6, "GASsoso",                  "GAS",  NULL,   NULL,   NULL,   20.0,   NULL,   NULL,   NULL,   1.3,    "QUALITY GAS");

INSERT INTO contract (id, id_meter, id_supply, date_S, date_F, date_C) VALUES
-- CONTRATTI BALZO --
(1, 1, 1, "2021-01-01", "2025-02-02", NULL),
(2, 1, 5, "2019-05-06", "2021-01-01", "2020-01-13"),
(3, 2, 2, "2019-04-21", "2023-01-01", NULL),
(4, 3, 3, "2021-01-01", "2025-02-02", NULL),
(5, 4, 4, "2019-05-06", "2023-01-01", "2020-01-13"),
-- CONTRATTI AGENZIA ESEP --
();

INSERT INTO detections (id, date_S, date_F, id_meter, detection) VALUES
-- RILEVAZIONI BALZO --
    -- GAS --
(1, "2021-01-01", "2021-04-01", 1, 423.2),
(2, "2021-04-01", "2021-08-01", 1, 432.6),
(3, "2021-08-01", "2022-01-01", 1, 474.4),
(4, "2022-01-01", "2022-04-01", 1, 515.0),
(5, "2021-01-01", "2021-04-01", 3, 413.2),
(6, "2021-04-01", "2021-08-01", 3, 434.4),
(7, "2021-08-01", "2022-01-01", 3, 404.8),
(8, "2022-01-01", "2022-04-01", 3, 435.3),
    -- EE --
(5, "2021-01-01", "2021-04-01", 2, 3246.1),
(6, "2021-04-01", "2021-08-01", 2, 4565.3),
(7, "2021-08-01", "2022-01-01", 2, 6565.5),
(8, "2022-01-01", "2022-04-01", 2, 4566.2),
(9, "2021-01-01", "2021-04-01", 4, 3243.1),
(10, "2021-04-01", "2021-08-01", 4, 4549.3),
(11, "2021-08-01", "2022-01-01", 4, 5525.5),
(12, "2022-01-01", "2022-04-01", 4, 4566.2),
-- RILEVAZIONI ESEP --
();


INSERT INTO bill (id, type, date_S, date_F, deadline, date_P, price, id_contract, avg_waste) VALUES
-- FATTURE BALZO --
(1, "FTE", "2020-01-01", "2021-01-01", "2021-04-01", "2022-03-07", 572.20, 2, 116.42),
(2, "FTG", "2021-01-01", "2022-01-01", "2022-06-01", "2022-04-16", 457.00, 1, 124.50),
(3, "NCG", "2021-01-01", "2022-01-01", "2022-08-01", "2022-04-12", 662.50, 3, 1204.74),
(4, "NCG", "2020-01-01", "2021-01-01", "2021-05-01", "2022-03-09", 652.50, 3, 1157.58),
(5, "FTE", "2020-01-01", "2021-01-01", "2021-04-01", "2022-03-07", 532.20, 4, 116.42),
(6, "FTG", "2021-01-01", "2022-01-01", "2022-06-01", "2022-04-16", 399.00, 4, 124.50),
(7, "NCG", "2021-01-01", "2022-01-01", "2022-08-01", "2022-04-12", 632.50, 5, 1204.74),
(8, "NCG", "2020-01-01", "2021-01-01", "2021-05-01", "2022-03-09", 642.50, 5, 1157.58),
-- FATTURE ESEP --
();
