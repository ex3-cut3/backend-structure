const db = require('../db');
const isNull = require('../helpers/functions').isNull;
const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository{
    table = 'user';

    async getById(id) {
        const [user] = await db(this.table)
            .where('id', id)
            .limit(1)
            .returning("*");
        return user;
    }

    async getByEmailOrPhone(email, phone) {
        const query = db(this.table);
        if (email) {
            query.where('email', email);
        }
        if (phone) {
            query.orWhere('phone', phone);
        }
        query
            .limit(1)
            .returning('*');
        const [user] = await query;
        return user;
    }

    async create(createUserDto) {
        const [user] = await db(this.table)
            .insert({
                phone: createUserDto.getPhone(),
                city: createUserDto.getCity(),
                email: createUserDto.getEmail(),
                type: createUserDto.getType(),
                name: createUserDto.getName(),
                id: createUserDto.getId()
            })
            .returning("*");
        return user;
    }

    async update(updateUserDto) {
        const updateBody = {};
        if (!isNull(updateUserDto.getName())) {
            updateBody.name = updateUserDto.getName();
        }
        if (!isNull(updateUserDto.getCity())) {
            updateBody.name = updateUserDto.getCity();
        }
        if (!isNull(updateUserDto.getEmail())) {
            updateBody.name = updateUserDto.getEmail();
        }
        if (!isNull(updateUserDto.getPhone())) {
            updateBody.name = updateUserDto.getPhone();
        }
        const [user] = await db(this.table)
            .where('id', updateUserDto.getId())
            .update(updateBody)
            .returning("*");
        return user;
    }

    async updateBalance(userId, newBalance) {
        const [user] = await db(this.table)
            .where('id', userId)
            .update({
                balance: newBalance
            })
            .returning("*");
        return user;
    }
}

module.exports = UserRepository;