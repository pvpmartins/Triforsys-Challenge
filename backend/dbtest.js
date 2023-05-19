const { Client } = require('pg')

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

client.connect((err) => {
  if (err) {
    console.error('Failed to connect', err.stack)
  } else {
    console.log('Connected successfully')
    client.end()
  }
})
