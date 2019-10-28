const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.static('src/frontend'));
app.use(express.urlencoded({ extended: false }));

app.post('/my-form-route', (request, response) => {
    console.log('SOMEONE SUBMITTED A FORM:', request.body);
    response.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Running FamTree backend on ${PORT}!`);
});
