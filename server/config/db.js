const mongoose = require('mongoose');

const dbConnect = async () => {
	try {
		const con = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Database conected at ${con.connection.host}`.yellow.underline);
	} catch (error) {
		console.log('Database note connected'.red, error);
		process.exit(1);
	}
};

module.exports = dbConnect;
