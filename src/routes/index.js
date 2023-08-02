const userRoutes = require("./user.routes");
const conversationsRoutes = require("../routes/conversations.routes");

const apiRoutes = (app) => {
    app.use(userRoutes);
    app.use(conversationsRoutes);
}

module.exports = apiRoutes