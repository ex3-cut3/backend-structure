class OddCreatedDto {
    _odds = null;
    _event = null;

    getEvent() {
        return this._event;
    }

    getOdds() {
        return this._odds;
    }

    setEvent(event) {
        this._event = event;
        return this;
    }

    setOdds(odds) {
        this._odds = odds;
        return this;
    }
}

module.exports = OddCreatedDto;