class StatsGetDto {
    _totalUsers = null;
    _totalBets = null;
    _totalEvents = null;

    setTotalUsers(count) {
        this._totalUsers = count;
        return this;
    }

    getTotalUsers() {
        return this._totalUsers;
    }

    setTotalBets(count) {
        this._totalBets = count;
        return this;
    }

    getTotalBets() {
        return this._totalBets;
    }

    setTotalEvents(count) {
        this._totalEvents = count;
        return this;
    }

    getTotalEvents() {
        return this._totalEvents;
    }
}

module.exports = StatsGetDto;