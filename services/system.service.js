const StatsGetDto = require('../app/dto/system/stats.get.dto');

class SystemService {
    _betRepository = null;
    _eventRepository = null;
    _userRepository = null;

    constructor(betRepository, eventRepository, userRepository) {
        this._betRepository = betRepository;
        this._eventRepository = eventRepository;
        this._userRepository = userRepository;
    }

    async getStats() {
        const totalBets = await this._betRepository.count();
        const totalEvents = await this._eventRepository.count();
        const totalUsers = await  this._userRepository.count();
        return new StatsGetDto()
            .setTotalBets(totalBets)
            .setTotalUsers(totalUsers)
            .setTotalEvents(totalEvents);
    }
}

module.exports = SystemService;