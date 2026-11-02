// Entry point — sets up Express app, mounts routes, connects to DB.
// Stubbed for documentation-sample purposes.
import express from 'express';

const app = express();

app.use(express.json());

// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/products', productRoutes);
// app.use('/api/v1/orders', orderRoutes);
// app.use('/api/v1/cart', cartRoutes);
// app.use('/api/v1/payments', paymentRoutes);
// app.use('/api/v1/seller', sellerRoutes);
// app.use('/api/v1/admin', adminRoutes);

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`ShopSphere API running on :${PORT}`));
