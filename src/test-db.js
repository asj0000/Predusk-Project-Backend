// const { Sequelize } = require('sequelize');
// require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'mysql',
//     logging: false
//   }
// );

// (async () => {
//   try {
//     console.log(
//         process.env.DB_NAME,
//         process.env.DB_USER,
//         process.env.DB_PASSWORD,
//     )
//     await sequelize.authenticate();
//     console.log("✅ Connection successful!");
//   } catch (err) {
//     console.error("❌ Connection failed:", err);
//   }
// })();
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Load config.json
const env = process.env.NODE_ENV || 'production';
const config = require(path.resolve(__dirname, 'config', 'config.json'))[env];

// Initialize Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectModule: require('mysql2'),
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.resolve(__dirname, '../certs/ca.pem')).toString()
      },
    },
  }
);

(async () => {
  try {
    console.log("🔍 Testing DB connection with:");
    console.log("DB:", config.database);
    console.log("User:", config.username);
    console.log("Host:", config.host);
    console.log("Port:", config.port);
    console.log("dialectoptions:", sequelize.options.dialectOptions);

    await sequelize.authenticate();
    console.log("✅ Connection successful!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await sequelize.close();
  }
})();
