// @ts-ignore
const servers = require("../json/servers.json");

module.exports = function (args) {
    // Defaults to the first server's IP
    let server = servers[0][1];
    const oldserver = server;

    if (args[0] !== 'ENA') {
        servers.forEach((srv) => {
            // Check if the server is in the servers.json file
            if (srv[0] == args[0] && srv[1] !== server) {
                // If the server is in the servers.json file, set the server to the server's IP
                return (server = srv[1]);
            }
        });

        // Set the server to the content if it might be valid
        if (oldserver == server) {
            server = args[0];
        }
    }

    return server;
}
