const db = require('../db');
const BaseRepository = require('./base.repository');

class OddsRepository extends BaseRepository {
    table = 'odds';

    async create(createOddsDto) {
        const [odds] = await db(this.table)
            .insert({
                home_win: createOddsDto.getHomeWin(),
                draw: createOddsDto.getDraw(),
                away_win: createOddsDto.getAwayWin()
            })
            .returning('*');
        return odds;
    }
}

module.exports = OddsRepository;