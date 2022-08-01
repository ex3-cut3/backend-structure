module.exports = (eventData) => ({
    id: eventData?.id,
    oddsId: eventData?.odds_id,
    type: eventData?.type,
    homeTeam: eventData?.home_team,
    awayTeam: eventData?.away_team,
    score: eventData?.score,
    startAt: eventData?.start_at,
    createdAt: eventData?.created_at,
    updatedAt: eventData?.updated_at,
});