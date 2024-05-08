// @ts-ignore
const servers = require("../json/servers.json");

module.exports = function (args) {
    let server = servers[0][1];
    const oldserver = server;

    if (args[0] !== 'ENA') {
        servers.forEach((srv) => {
            if (srv[0] == args[0] && srv[1] !== server) {
                return (server = srv[1]);
            }
        });
    }

    if (args[0] !== 'ENA' && args[0].includes('.') && oldserver == server) {
        server = args[0];
    }

    return server;
}