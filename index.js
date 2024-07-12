import Express from 'express';
import db from './config/database.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import user from './model/userModel.js';
import notification from './model/notification.js';
import product_category from './model/product_category.js';
import product from './model/product.js';
import transaction from './model/transaction.js';
import item from './model/item.js';
import schedule from './model/schedule.js';
import router from './routes/index.js';

dotenv.config();
const app = Express();

// Koneksi dan sinkronisasi basis data
(async () => {
  try {
    await db.authenticate();
    console.log('Connection to the database has been established successfully.');
    await db.sync(); // Sinkronisasi model dengan database
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Keluar dari proses Node.js jika tidak dapat terhubung ke database
  }
})();

// Middleware
app.use(
  cors({
    origin: '*', // Izinkan permintaan dari semua origin
    credentials: true, // Izinkan pengiriman cookie melalui CORS
  })
);
app.use(cookieParser());
app.use(Express.json());

// Gunakan router
app.use(router);

// Menjalankan server
const server = app.listen(3000, () => {
  const port = server.address().port;
  console.log(`Server is running on http://localhost:${port}`);
});