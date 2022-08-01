const appRouter = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const createEventValidation = require('../http/request/validation/event/create.event.validation');
const eventController = require('../app/controllers/events.controller');

appRouter.post(
    '/',
    authMiddleware,
    adminMiddleware,
    createEventValidation,
    eventController.createEvent
);

module.exports = appRouter;