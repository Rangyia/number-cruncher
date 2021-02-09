CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    dob DATE NOT NULL,
    address TEXT,
    user_img TEXT,
    staff BOOLEAN NOT NULL DEFAULT TRUE,
    manager BOOLEAN NOT NULL DEFAULT FALSE,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    password_created_date DATE NOT NULL DEFAULT CURRENT_DATE,
    suspension_start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    suspension_end_date DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO users (
    username,
    password,
    first_name,
    last_name,
    dob,
    address,
    user_img,
    manager,
    admin,
    active
) VALUES (
    'jgraham0121',
    PGP_SYM_ENCRYPT('Test1234', 'test'),
    'Jess',
    'Graham',
    '2000-11-20',
    '123 Magic Castle Lane',
    '/file/user.img',
    TRUE,
    TRUE,
    TRUE
);


