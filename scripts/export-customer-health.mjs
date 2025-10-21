import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

const outPath = path.resolve(process.cwd(), 'src/data/customerHealth.json');

const pool = await mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const [rows] = await pool.execute(`
  SELECT ch.snapshot_date, ch.account_name, ch.arr, ch.dau_percent, ch.features_used,
         ch.tickets_30d, ch.avg_resolution_hrs, ch.csat_score, ch.qbr_status
  FROM customer_health_history ch
  JOIN (SELECT MAX(snapshot_date) AS max_date FROM customer_health_history) d
    ON ch.snapshot_date = d.max_date
  ORDER BY ch.arr DESC, ch.account_name ASC
`);

const mapped = rows.map(r => ({
  snapshot_date: new Date(r.snapshot_date).toISOString().slice(0,10),
  account_name: r.account_name,
  arr: Number(r.arr),
  dau_percent: Number(r.dau_percent),
  features_used: Number(r.features_used),
  tickets_30d: Number(r.tickets_30d),
  avg_resolution_hrs: Number(r.avg_resolution_hrs),
  csat_score: Number(r.csat_score),
  qbr_status: r.qbr_status
}));

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(mapped, null, 2));
console.log(`✅ Wrote ${mapped.length} rows → ${outPath}`);
process.exit(0);

