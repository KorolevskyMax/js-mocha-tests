const jsonServer = require('json-server');

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
        5050,
        () => console.log("Mock Server is listening on http://localhost:5050/"));
    return mockServer;
};

