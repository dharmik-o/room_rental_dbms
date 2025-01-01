DELIMITER $$

CREATE TRIGGER check_owner
BEFORE INSERT ON Rooms
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Users WHERE user_id = NEW.owner_id AND role = 'owner') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only owners can add rooms.';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER set_room_unavailable
AFTER INSERT ON Rentals
FOR EACH ROW
BEGIN
    UPDATE Rooms SET available = FALSE WHERE room_id = NEW.room_id;
END$$

DELIMITER ;

select * from users;
select * from rooms where owner_id ="1";
