const db = require('../db');

class TransactionRepository {
    table = 'transaction';

    async create(createTransactionDto) {
        const [transaction] = await db(this.table)
            .insert({
                user_id: createTransactionDto.getUserId(),
                card_number: createTransactionDto.getCardNumber(),
                amount: createTransactionDto.getAmount(),
            })
            .returning("*");
        return transaction;
    }
}

module.exports = TransactionRepository;