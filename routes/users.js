const appRouter = require('express').Router();
const userByIdValidation = require('../http/request/validation/user/user.getById.validation');
const userCreateValidation = require('../http/request/validation/user/user.create.validation');
const userUpdateValidation = require('../http/request/validation/user/user.update.validation');
const usersController = require('../app/controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authMismatchMiddleware = require('../middlewares/auth.mismatch.middleware');

appRouter.get(
    '/:id',
    userByIdValidation,
    usersController.getUserById
);

appRouter.post(
    '/',
    userCreateValidation,
    usersController.createUser
);

appRouter.put(
    '/:id',
    authMiddleware,
    authMismatchMiddleware,
    userUpdateValidation,
    usersController.updateUser
);

module.exports = appRouter;