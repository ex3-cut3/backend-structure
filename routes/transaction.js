const appRouter = require('express').Router();
const createTransactionValidation = require("../http/request/validation/transaction/transaction.create.validation");
const transactionsController = require("../app/controllers/transactions.controller");
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

appRouter.post(
    '/',
    authMiddleware,
    adminMiddleware,
    createTransactionValidation,
    transactionsController.createTransaction
);

module.exports = appRouter;