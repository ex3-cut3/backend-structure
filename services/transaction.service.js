const UserNotFoundError = require('../app/error/UserNotFound');
const TransactionCreatedDto = require('../app/dto/transaction/transaction.created.dto');

class TransactionService {
    _transactionRepository = null;
    _userRepository = null;
    constructor(transactionRepository, userRepository) {
        this._transactionRepository = transactionRepository;
        this._userRepository = userRepository;
    }

    async createTransaction(createTransactionDto) {
        const user = await this._userRepository.getById(
            createTransactionDto.getUserId()
        );
        if (!user) {
            throw new UserNotFoundError();
        }
        const transaction = await this._transactionRepository.create(createTransactionDto);
        const newUserBalance = user.balance + transaction.amount;
        await this._userRepository.updateBalance(
            user.id, newUserBalance
        );
        return new TransactionCreatedDto()
            .setTransaction(transaction)
            .setNewBalance(newUserBalance);
    }
}

module.exports = TransactionService;