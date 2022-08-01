class TransactionCreatedDto {
    _transaction = null;
    _newBalance = null;

    getTransaction() {
        return this._transaction;
    }

    setTransaction(value) {
        this._transaction = value;
        return this;
    }

    getNewBalance() {
        return this._newBalance;
    }

    setNewBalance(value) {
        this._newBalance = value;
        return this;
    }
}

module.exports = TransactionCreatedDto;