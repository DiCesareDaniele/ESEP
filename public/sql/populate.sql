INSERT INTO personal (id, first_name, last_name, CF, phone) VALUES
(1, "Balzo", "Federico", "DBSFDSGL781VSDFD", "3934435345");

INSERT INTO enterprise (id, business_name, P_IVA, phone) VALUES 
(1, "ESEP", "AEZ1324BBLC", "0453294329");

INSERT INTO account (id, email, password, type, personal_id, enterprise_id) VALUES 
(1, "dicesaredaniele@gmail.com", "$2y$10$oJ0V6sJZd7jRyBTHzNZ6U.9ra3tj7qkRTS3U8Y.7B.I.ZWdo6G8Z6", "enterprise", NULL, 1),
(2, "riccardoscardino@gmail.com", "$2y$10$yk9h1OIE6guqnxm.mY4zT.esgMqNoUBx4P4mMsQwss2WzfrS2oXba", "enterprise", NULL, 1),
(3, "esep.payments@gmail.com", "$2y$10$rIYVhK01dIvtbzP2/R4KzejiP7cInKdjx7flCNyawABLNQy01aDhm", "enterprise", NULL, 1),
(4, "balzofederico@gmail.com", "$2y$10$G46DvNQjiSvrfMFs5rtZxe0wgfEwTyrXgJIAszGO7I/i/gkqCzKwG", "personal", 1, NULL);