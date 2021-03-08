const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3030;
// CORS for react app, assuming port 3000\
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

// use middleware to serve static images
app.use(express.static('public'));
app.use(express.json());

// data from options file

const rawData = fs.readFileSync('./pizza-options.json', 'utf-8');
const data = JSON.parse(rawData);

// get pizzas items GET /pizzas
app.get('/pizzas', (req, res, next) => {
	//return data
	res.json(data.pizzas);
});

// get toppings items GET /toppings
app.get('/toppings', (req, res, next) => {
	res.json(data.toppings);
});

//POST order
app.post('/order', (req, res, next) => {
	// create a random order number
	const orderNumber = Math.floor(Math.random() * 10000000000);

	// return "order number" as the response
	res.status(201).json({
		orderNumber,
		pizza: req.body.pizza,
		toppings: req.body.toppings,
	});
});

if (require.main === module) {
	app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
