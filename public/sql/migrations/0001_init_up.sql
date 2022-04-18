-- ACCOUNT --
CREATE TABLE account (
	id INT AUTO_INCREMENT PRIMARY KEY,
	personal_id INT,
	enterprise_id INT,
	email VARCHAR(64) NOT NULL,
	password VARCHAR(128) NOT NULL,
	type ENUM('personal', 'enterprise') NOT NULL,
	UNIQUE(email),
	FOREIGN KEY(personal_id) REFERENCES personal(id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(enterprise_id) REFERENCES enterprise(id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	CHECK(enterprise_id IS NULL AND personal_id IS NOT NULL 
			OR enterprise_id IS NOT NULL AND personal_id IS NULL)
);

-- PERSONA FISICA --
CREATE TABLE personal (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(128) NOT NULL,
	last_name VARCHAR(128) NOT NULL,
	CF CHAR(16) NOT NULL,
	phone VARCHAR(15),
	UNIQUE(CF)
);

-- AZIENDA --
CREATE TABLE enterprise (
	id INT AUTO_INCREMENT PRIMARY KEY,
	business_name VARCHAR(64) NOT NULL,
	P_IVA CHAR(11) NOT NULL,
	phone VARCHAR(15),
	UNIQUE(P_IVA)
);

-- SEDE --
CREATE TABLE site (
    id INT AUTO_INCREMENT PRIMARY KEY,
    indirizzo VARCHAR(64) NOT NULL,
    city VARCHAR(32) NOT NULL,
    CAP CHAR(5) NOT NULL,
    apartment_n INT NOT NULL,
	personal_id INT,
	enterprise_id INT,
	FOREIGN KEY(personal_id) REFERENCES personal(id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(enterprise_id) REFERENCES enterprise(id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	CHECK(enterprise_id IS NULL AND personal_id IS NOT NULL 
			OR enterprise_id IS NOT NULL AND personal_id IS NULL)
);

-- CONTATORE --
CREATE TABLE meter (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_site INT NOT NULL,
	utility ENUM('GAS', 'EE') NOT NULL,
	FOREIGN KEY(id_site) REFERENCES site(id)
		ON UPDATE CASCADE ON DELETE CASCADE,
);

-- FORNITURA --
CREATE TABLE supply (
	id INT AUTO_INCREMENT PRIMARY KEY,
	offer VARCHAR(128) NOT NULL,
	utility ENUM('GAS', 'EE') NOT NULL,
	contractual_treshold FLOAT(4, 1),
	max_treshold FLOAT(4, 1),
	fixed_costs FLOAT(6, 1),
	F1 FLOAT(4, 3),
	F2 FLOAT(4, 3),
	F3 FLOAT(4, 3),
	gas FLOAT(4, 1),
	supplier VARCHAR(32) NOT NULL,
	CHECK(gas IS NULL AND F1 IS NOT NULL AND F2 IS NOT NULL AND F3 IS NOT NULL
			OR gas IS NOT NULL AND F1 IS NULL AND F2 IS NULL AND F3 IS NULL)
);

-- CONTRATTO --
CREATE TABLE contract (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_meter INT NOT NULL,
	id_supply INT NOT NULL,
	date_S DATE NOT NULL,
	date_F DATE NOT NULL,
	date_C DATE,
	FOREIGN KEY(id_meter) REFERENCES meter(id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_supply) REFERENCES supply(id)
		ON UPDATE CASCADE ON DELETE CASCADE,
);

-- RILEVAZIONI --
CREATE TABLE detections (
	id INT AUTO_INCREMENT PRIMARY KEY,
	date DATE NOT NULL,
	id_meter NOT NULL,
	detection FLOAT(6, 1),
	FOREIGN KEY(id_meter) REFERENCES meter(id)
		ON UPDATE CASCADE ON DELETE CASCADE,
);

-- FATTURE --
CREATE TABLE bill (
	id INT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(64) NOT NULL,
	date_S DATE NOT NULL,
	date_F DATE NOT NULL,
	deadline DATE NOT NULL,
	date_P DATE,
	price FLOAT(7, 2),
	id_contract INT NOT NULL,
	avg_waste FLOAT(5, 1) NOT NULL,
	FOREIGN KEY(id_contract) REFERENCES contract(id)
		ON UPDATE CASCADE ON DELETE CASCADE,
);



CREATE USER 'default'@'localhost' IDENTIFIED BY 'evRCyB6qzL9A8cUG';
GRANT SELECT ON 'esep'.'clients' TO 'default'@'localhost';

CREATE USER 'personal'@'localhost' IDENTIFIED BY '8eFrZDd6jwr26Uq4';
GRANT SELECT ON *.* TO 'personal'@'localhost';
GRANT UPDATE ON *.* TO 'personal'@'localhost';

CREATE USER 'enterprise'@'localhost' IDENTIFIED BY 'UdFCPMgV5jzc7Xr8';
GRANT SELECT ON *.* TO 'enterprise'@'localhost';
GRANT UPDATE ON *.* TO 'enterprise'@'localhost';

FLUSH PRIVILEGES;