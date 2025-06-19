/* Variables for the improted modules*/
/* express is the web framework*/
const express = require('express');
const axios = require('axios');
/* site is the express instance */
const site = express();
/* site.set tells express to use ejs to render the html */
/* site.use serves styles.css from the public folder*/
site.set('view engine', 'ejs');
site.use(express.static('public'));

/* gets index.ejs and provides all cocktail information */
site.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const drink = response.data.drinks[0];
        res.render('index', { drink });
/* in case of error it will be caught and displayed */
    } catch (err) {
        console.error(err);
        res.status(500).send("Could not fetch random cocktail.");
    }
});

/* creates a listener on port 3000 */
site.listen(3000, () => {
    console.log('Server is running on port 3000');
});