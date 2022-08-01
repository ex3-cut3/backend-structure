class TransactionCreateDto {
    _userId = null;
    _cardNumber = null;
    _amount = null;

    setUserId(id) {
        this._userId = id;
        return this;
    }
    getUserId() {
        return this._userId;
    }
    setCardNumber(cardNumber) {
        this._cardNumber = cardNumber;
        return this;
    }
    getCardNumber() {
        return this._cardNumber;
    }
    setAmount(amount) {
        this._amount = amount;
        return this;
    }
    getAmount() {
        return this._amount;
    }
}

module.exports = TransactionCreateDto;