const http = require("http");
// routes is a customer file
const routes = require("./routes")

const server = http.createServer(routes);

server.listen(3000);