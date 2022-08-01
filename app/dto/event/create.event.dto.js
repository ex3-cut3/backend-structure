class CreateEventDto {
    _type = null;
    _homeTeam = null;
    _awayTeam = null;
    _homeWin = null;
    _awayWin = null;
    _draw = null;
    _startAt = null;

    setStartAt(startAt) {
        this._startAt = startAt;
        return this;
    }

    getStartAt() {
        return this._startAt;
    }

    setHomeTeam(homeTeam) {
        this._homeTeam = homeTeam;
        return this;
    }

    getHomeTeam() {
        return this._homeTeam;
    }

    setAwayTeam(awayTeam) {
        this._awayTeam = awayTeam;
        return this;
    }

    getAwayTeam() {
        return this._awayTeam;
    }

    setHomeWin(homeWin) {
        this._homeWin = homeWin;
        return this;
    }

    getHomeWin() {
        return this._homeWin;
    }

    setAwayWin(awayWin) {
        this._awayWin = awayWin;
        return this;
    }

    getAwayWin() {
        return this._awayWin;
    }

    setDraw(draw) {
        this._draw = draw;
        return this;
    }

    getDraw() {
        return this._draw;
    }

    setType(type) {
        this._type = type;
        return this;
    }

    getType() {
        return this._type;
    }
}

module.exports = CreateEventDto;