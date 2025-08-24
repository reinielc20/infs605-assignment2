CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    attendance JSONB DEFAULT '[]'
);

INSERT INTO students (name, email, attendance) VALUES
-- Māori
('Aroha Ngata', 'aroha.ngata@example.com', '[]'),
('Tane Mahuta', 'tane.mahuta@example.com', '[]'),
('Moana Rangi', 'moana.rangi@example.com', '[]'),
('Wiremu Pita', 'wiremu.pita@example.com', '[]'),

-- Pacific
('Lani Tui', 'lani.tui@example.com', '[]'),
('Malia Fetu', 'malia.fetu@example.com', '[]'),
('Sione Vaka', 'sione.vaka@example.com', '[]'),
('Tavita Fale', 'tavita.fale@example.com', '[]'),

-- Indian
('Priya Sharma', 'priya.sharma@example.com', '[]'),
('Ravi Patel', 'ravi.patel@example.com', '[]'),
('Anjali Mehta', 'anjali.mehta@example.com', '[]'),
('Arjun Singh', 'arjun.singh@example.com', '[]'),

-- Chinese
('Li Wei', 'li.wei@example.com', '[]'),
('Zhang Mei', 'zhang.mei@example.com', '[]'),
('Chen Yong', 'chen.yong@example.com', '[]'),
('Wang Xiu', 'wang.xiu@example.com', '[]'),

-- Korean
('Kim Ji-hoon', 'kim.jihoon@example.com', '[]'),
('Park Soo-jin', 'park.soojin@example.com', '[]'),

-- Filipino
('Maria Santos', 'maria.santos@example.com', '[]'),
('Juan Dela Cruz', 'juan.delacruz@example.com', '[]'),

-- Malaysian
('Ahmad Rahman', 'ahmad.rahman@example.com', '[]'),
('Nur Aisyah', 'nur.aisyah@example.com', '[]'),

-- American / Western
('Alice Smith', 'alice.smith@example.com', '[]'),
('Bob Johnson', 'bob.johnson@example.com', '[]'),
('Charlie Brown', 'charlie.brown@example.com', '[]'),
('Diana Prince', 'diana.prince@example.com', '[]'),
('Ethan Hunt', 'ethan.hunt@example.com', '[]'),
('Hannah Lee', 'hannah.lee@example.com', '[]'),
('Michael Scott', 'michael.scott@example.com', '[]'),
('Rachel Green', 'rachel.green@example.com', '[]');