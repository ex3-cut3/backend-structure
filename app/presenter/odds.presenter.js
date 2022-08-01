module.exports = (eventData) => ({
    id: eventData?.id,
    homeWin: eventData?.home_win,
    draw: eventData?.draw,
    awayWin: eventData?.away_win,
    createdAt: eventData?.created_at,
    updatedAt: eventData?.updated_at,
});