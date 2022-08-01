const db = require("../db");

class BaseRepository {
    table = null;

    async count() {
        const [result] = await this.getDb()
            .count('id');
        return result.count;
    }

    getDb() {
        return db(this.table);
    }
}

module.exports = BaseRepository;