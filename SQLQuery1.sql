use HardwareAssetManagment

select * from Users;
select * from Request;
select * from Hardware;
select * from Issue;
select * from Project;
select * from UserRequest;

drop table Users;

INSERT INTO Project (name, description, startDate, endDate, createdAt, updatedAt, status)
VALUES 
('Genric', 'This is a sample project.', '2025-03-10', '2025-12-31', GETDATE(), GETDATE(), 'ACTIVE');

INSERT INTO Users (employeeId, name, email, password, role, project_id, createdAt, updatedAt)
VALUES 
('EMP001', 'Admin User', 'admin@example.com', 'hashed_password', 'ADMIN', 1, GETDATE(), GETDATE());

UPDATE Users 
SET role = 'ADMIN' 
WHERE userId = 4;
