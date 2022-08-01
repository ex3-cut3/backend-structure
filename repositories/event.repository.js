const BaseRepository = require('./base.repository');

class EventRepository extends BaseRepository {
    table = 'event';

    async create(createEventData) {
        const [event] = await this.getDb()
            .insert({
                type: createEventData.type,
                odds_id: createEventData.oddsId,
                home_team: createEventData.homeTeam,
                away_team: createEventData.awayTeam,
                start_at: createEventData.startAt
            })
            .returning('*');
        return event;
    }
}

module.exports = EventRepository;