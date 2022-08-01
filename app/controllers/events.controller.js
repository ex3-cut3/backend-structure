const eventService = require('../../services').eventService;
const CreateEventDto = require('../dto/event/create.event.dto');
const httpCodes = require('../../constants/http');
const eventPresenter = require('../presenter/event.presenter');
const oddsPresenter = require('../presenter/odds.presenter');

exports.createEvent = async (req, res, next) => {
    try {
       const createEventDto = new CreateEventDto()
           .setType(req.body.type)
           .setHomeWin(req.body.odds.homeWin)
           .setHomeTeam(req.body.homeTeam)
           .setAwayWin(req.body.odds.awayWin)
           .setAwayTeam(req.body.awayTeam)
           .setDraw(req.body.odds.draw)
           .setStartAt(req.body.startAt);
       const result = await eventService.createEvent(createEventDto);
       res.status(httpCodes.OK_HTTP_CODE).json({
           ...eventPresenter(result.getEvent()),
           odds: oddsPresenter(result.getOdds())
       });
    } catch (e) {
        next(e);
    }
}