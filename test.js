const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme'
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Database connection successful!');
        client.release();
    } catch (error) {
        console.error('Error connecting to database:', error.message);
    } finally {
        await pool.end();
    }
}

testConnection();
