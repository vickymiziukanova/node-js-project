CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    finish_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS task_details (
    id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL,
    additional_info TEXT,
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);
