import express from 'express';

import mysql2 from 'mysql2';

import dotenv from 'dotenv';

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

const app = express();

const PORT = 3002;

//Enable static file serving
app.use(express.static('public'));

//Add "middleware" to allow the app to parse form data
//Access form data through req.body
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');

const submissions = [];

app.get('/', (req, res) => {
    res.render('home');
});

// Database test route (for debugging)
// app.get('/db-test', async (req, res) => {
//     try {
//          // [orders] uses array destructuring to get just the data
//  const [orders] = await pool.query('SELECT * FROM orders');
//               res.send(orders);
//     } catch (err) {
//        console.error('Database error:', err);
//        res.status(500).send('Database error: ' + err.message);
//     }
// });

app.get('/form', (req, res) => {
    res.render('form');
});

app.post('/confirm', async(req,res) => {
    
    //Create a JSON object to store order data
    const form = req.body;
    form.timestamp = new Date().toLocaleString();
    console.log(form);

    // Define an SQL query to INSERT new order
    const sql = `INSERT INTO orders (fname, lname, 
    jobtitle, company, linkedin, email, meeting, other, 
    message, mail, format)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Create an array of parameters from order data
    const params = [
        form.fname,
        form.lname,
        form.jobtitle,
        form.company,
        form.linkedin,
        form.email,
        form.meeting,
        form.other,
        form.message,
        form.mail,
        form.format
    ];

    // Execute the query
    const [result] = await pool.execute(sql, params);

    // Get the id from the newly inserted row
    form.id = result.insertId;
    console.log("A new row was inserted with ID" + form.id);    

    //Add order object to orders array
    //orders.push(order);
    //console.log(orders);

    //Display the confirmation page
    res.render('confirm', {form});
});

app.get('/admin', async(req,res) => {
    try {
        // Fetch all orders from database, most recent first
        const [submissions] = await pool.query(`SELECT * FROM orders
                ORDER BY timestamp DESC`);  
        // Render the admin page
        res.render('admin', { submissions });      
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error loading orders: ' + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 

