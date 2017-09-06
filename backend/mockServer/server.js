const jsonServer = require('json-server');
const config = require('config');

exports.runMockServer = () => {
    const mockServer = jsonServer.create();
    const mockRouter = jsonServer.router('./mockServer/mocks/db.json');
    const middlewares = jsonServer.defaults();
    mockRouter.render = (req, res) => {
        res.jsonp({
            body: res.locals.data
        })
    };
    mockServer.use(middlewares);
    mockServer.use(mockRouter);
    mockServer.listen(
        config.get("mockServer").port,
        () => console.log("Mock Server is listening on http://localhost:" + config.get("mockServer").port + "/"));
    return mockServer;
};

