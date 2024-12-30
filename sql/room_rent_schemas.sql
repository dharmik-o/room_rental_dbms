CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    dob DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'owner') NOT NULL,
    UNIQUE(name)
);

CREATE TABLE Rooms (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT,
    area VARCHAR(100) NOT NULL,
    room_type ENUM('Single', 'Shared', 'Studio') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Rentals (
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    user_id INT,
    rental_date DATE NOT NULL,
    rental_period INT NOT NULL, -- in months
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE OwnerDetails (
    owner_id INT,
    contact_number VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);

CREATE TABLE AreaDetails (
    area_id INT AUTO_INCREMENT PRIMARY KEY,
    area_name VARCHAR(100) NOT NULL,
    UNIQUE(area_name)
);

