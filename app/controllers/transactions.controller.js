const transactionService = require('../../services/index').transactionService;
const CreateTransactionDto = require('../dto/transaction/transaction.create.dto');
const httpCodes = require('../../constants/http');
const transactionPresenter = require('../presenter/transasction.presenter');

exports.createTransaction = async (req, res, next) => {
    try {
        const dto = new CreateTransactionDto()
            .setAmount(Number(req.body.amount))
            .setCardNumber(req.body.cardNumber)
            .setUserId(req.body.userId);
        const transactionCreated = await transactionService.createTransaction(dto);
        res.status(httpCodes.OK_HTTP_CODE).json({
            ...transactionPresenter(transactionCreated.getTransaction()),
            currentBalance: transactionCreated.getNewBalance()
        });
    } catch (e) {
        next(e);
    }
}