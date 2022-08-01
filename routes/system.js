const appRouter = require('express').Router();
const systemController = require('../app/controllers/system.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

appRouter.get(
    '/health',
    systemController.health
);

appRouter.get(
    '/stats',
    authMiddleware,
    adminMiddleware,
    systemController.stats
);

module.exports = appRouter;