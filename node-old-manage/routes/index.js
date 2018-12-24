'use strict';

import classify from './classify'


export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('/classify', classify);
}