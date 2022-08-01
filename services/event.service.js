const CreateOddsDto = require('../app/dto/odd/create.odd.dto');
const OddsCreatedDto = require('../app/dto/odd/odd.created.dto');

class EventService {
    _eventRepository = null;
    _oddsRepository = null;

    constructor(eventRepository, oddsRepository) {
        this._eventRepository = eventRepository;
        this._oddsRepository = oddsRepository;
    }

    async createEvent(createEventDto) {
        const createOddsDto = new CreateOddsDto()
            .setHomeWin(createEventDto.getHomeWin())
            .setDraw(createEventDto.getDraw())
            .setAwayWin(createEventDto.getAwayWin());
        const odds = await this._oddsRepository.create(createOddsDto);
        const event = await this._eventRepository.create({
            oddsId: odds.id,
            type: createEventDto.getType(),
            homeTeam: createEventDto.getHomeTeam(),
            awayTeam: createEventDto.getAwayTeam(),
            startAt: createEventDto.getStartAt()
        });
        return new OddsCreatedDto()
            .setEvent(event)
            .setOdds(odds);
    }
}

module.exports = EventService;