class CreateOddDto {
    _homeWin = null;
    _awayWin = null;
    _draw = null;

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
}

module.exports = CreateOddDto;