module.exports = (transactionData) => ({
    id: transactionData?.id,
    userId: transactionData?.user_id,
    cardNumber: transactionData?.card_number,
    amount: transactionData?.amount,
    createdAt: transactionData?.created_at,
    updatedAt: transactionData?.updated_at,
});