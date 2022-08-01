module.exports = (statsData) => ({
    totalUsers: Number(statsData.totalUsers),
    totalBets: Number(statsData.totalBets),
    totalEvents: Number(statsData.totalEvents),
});