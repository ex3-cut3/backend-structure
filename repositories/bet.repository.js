const db = require('../db');
const BaseRepository = require('./base.repository');

class BetRepository extends BaseRepository{
    table = 'bet';
}

module.exports = BetRepository;