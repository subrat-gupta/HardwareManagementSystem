# HardwareManagementSystem
INSERT INTO HWType (id, description)
VALUES 
(1, 'Laptop'),
(2, 'Desktop'),
(3, 'Monitor'),
(4, 'Keyboard'),
(5, 'Mouse'),
(6, 'Printer'),
(7, 'Router'),
(8, 'Switch'),
(9, 'Server'),
(10, 'Projector');
INSERT INTO HWDetails (id, description, name, hwTypeId, dateOfInduction, inMultiModule, isIssued, isUnusable, kpitSerialNo, partNumber, productSerialNumber, released)
VALUES 
(1, 'High-end Laptop', 'Dell XPS 15', 1, '2023-01-15', 0, 0, 0, 'KPIT123456', 'PN123456', 'PSN123456', 1),
(2, 'Mid-range Desktop', 'HP ProDesk', 2, '2023-02-20', 1, 0, 0, 'KPIT123457', 'PN123457', 'PSN123457', 1),
(3, '4K Monitor', 'LG UltraFine', 3, '2023-03-10', 0, 0, 1, 'KPIT123458', 'PN123458', 'PSN123458', 1),
(4, 'Mechanical Keyboard', 'Logitech G Pro', 4, '2023-04-05', 0, 1, 0, 'KPIT123459', 'PN123459', 'PSN123459', 1),
(5, 'Wireless Mouse', 'Logitech MX Master 3', 5, '2023-05-18', 1, 0, 0, 'KPIT123460', 'PN123460', 'PSN123460', 1),
(6, 'Laser Printer', 'HP LaserJet Pro', 6, '2023-06-22', 0, 0, 0, 'KPIT123461', 'PN123461', 'PSN123461', 1),
(7, 'Gigabit Router', 'Netgear Nighthawk', 7, '2023-07-10', 1, 0, 0, 'KPIT123462', 'PN123462', 'PSN123462', 1),
(8, 'Network Switch', 'Cisco SG350', 8, '2023-08-15', 0, 0, 0, 'KPIT123463', 'PN123463', 'PSN123463', 1),
(9, 'Rack Server', 'Dell PowerEdge', 9, '2023-09-12', 1, 0, 1, 'KPIT123464', 'PN123464', 'PSN123464', 1),
(10, 'HD Projector', 'Epson PowerLite', 10, '2023-10-05', 0, 0, 0, 'KPIT123465', 'PN123465', 'PSN123465', 1);
