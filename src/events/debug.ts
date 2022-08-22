module.exports = {
	name: 'debug',
	async execute(debug, client) {
		if (process.argv[1] === '--debug') {
			console.log(debug);
		}
	},
};
