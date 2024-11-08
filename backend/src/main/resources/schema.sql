CREATE TABLE IF NOT EXISTS prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prescription_text TEXT,
    billing DOUBLE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
