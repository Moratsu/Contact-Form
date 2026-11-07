import express from 'express';

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

app.post('/confirm', (req,res) => {
    const form = req.body;
    form.timestamp = new Date()

    console.log(form);

    submissions.push(form);
    console.log(submissions);

    res.render('confirm', { form });
});

app.get('/admin', (req,res) => {
    res.render('admin', { submissions });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 

