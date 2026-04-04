const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'pallium_dragonknight_db',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'dragonknight_database',
  user: process.env.DB_USER || 'dk_user',
  password: process.env.DB_PASS || '',
});

pool.on('error', (err) => {
  console.error('Unexpected DB pool error:', err);
});

module.exports = pool;
