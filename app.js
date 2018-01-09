"use strict";
const express = require('express');
const rp = require('request-promise').defaults({ encoding: null });
const util = require('util');

const asyncMiddleware = (fn) =>
	(req, res, next) => {
		Promise.resolve(fn(req, res, next))
		.catch(next);
	};

const app = express();

app.get('/b64/', asyncMiddleware(async (req, res) => {
	const url = req.query.url;
	let data = await rp(url);
	data = data.toString('base64');
	res.send(data);
}));

app.listen(3005, function () {
	util.log('B64 Service on 3005');
});