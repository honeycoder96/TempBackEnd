//const hydraExpress = require('hydra-express');
//const express = hydraExpress.getExpress();
const express = require('express');
const app = express();

const connection = require('./utilities/connection');
const helmet = require('helmet');
const cors = require('cors');

connection.connectDB();
app.use(helmet());
app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/login', require('./routes/login'));
app.use('/api/register', require('./routes/register'));

app.listen(4000, () => console.log('server started at port 4000'));
/**
hydraExpress.init('./config.json', () => {
    connection.connectDB();
    app.use(helmet());
    app.use(cors())
    app.use(express.json({ extended: false }));
    app.use('/api/register', require('./routes/register'));
    app.use('/api/login', require('./routes/login'));
    app.use('/customer', require('./routes/customer'));

    hydraExpress.registerRoutes({ '/user': app });
})
*/
