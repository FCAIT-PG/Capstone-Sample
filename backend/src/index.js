// Entry point — sets up Express app, mounts routes, connects to DB.
// Stubbed for documentation-sample purposes.
const express = require('express');
const app = express();

app.use(express.json());

// app.use('/api/v1/auth', require('./routes/auth'));
// app.use('/api/v1/products', require('./routes/products'));
// app.use('/api/v1/orders', require('./routes/orders'));
// app.use('/api/v1/cart', require('./routes/cart'));
// app.use('/api/v1/payments', require('./routes/payments'));
// app.use('/api/v1/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ShopSphere API running on :${PORT}`));
