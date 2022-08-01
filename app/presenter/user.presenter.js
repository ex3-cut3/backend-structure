module.exports = (userData) => ({
    id: userData?.id,
    type: userData?.type,
    email: userData?.email,
    phone: userData?.phone,
    name: userData?.name,
    balance: userData?.balance,
    city: userData?.city,
    createdAt: userData?.created_at,
    updatedAt: userData?.updated_at,
});