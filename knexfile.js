export default {
  client: 'pg',
  connection: {
    host: '127.0.0.1',      
    port: 5432,             // port par défaut de PostgreSQL
    user: 'postgres', 
    password: 'postgres', 
    database: 'modem_db' 
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
}

