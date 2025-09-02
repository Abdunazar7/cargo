-- Active: 1756346283078@@localhost@5432@express_cargo

SELECT c.id, c.full_name, c.phone_number, COUNT(o.id) AS order_count
FROM client c
JOIN "order" o ON c.id = o."clientId"
WHERE c.full_name ILIKE 'A%'
GROUP BY c.id
HAVING COUNT(o.id) > 10

SELECT c.id,
       c.full_name,
       SUM(o.quantity) AS total_quantity
FROM client c
JOIN "order" o ON c.id = o."clientId"
GROUP BY c.id
ORDER BY total_quantity DESC
LIMIT 5;

SELECT DISTINCT c.full_name, c.phone_number
FROM client c
JOIN "order" o ON c.id = o."clientId"
JOIN operation op ON o.id = op."orderId"
JOIN status s ON op."statusId" = s.id
WHERE s.name = 'Delivered';
 