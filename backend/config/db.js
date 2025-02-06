const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_8eJSCHQX2ZBh@ep-fragrant-mountain-a216f64l-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: true, 
  },
});

module.exports = pool;
