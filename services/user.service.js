const jwt = require("jsonwebtoken");
const UserCreatedDto = require('../app/dto/user/user.created.dto');
const UserAlreadyExistsError = require('../app/error/UserAlreadyExists');
const UserNotFoundError = require('../app/error/UserNotFound');

class UserService {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    async getUserById(userGetDto) {
        const user = await this._userRepository.getById(
            userGetDto.getUserId()
        );
        if (!user) {
            throw new UserNotFoundError();
        }
        return user;
    }

    async createUser(createUserDto) {
        const userById = await this._userRepository.getByEmailOrPhone(
            createUserDto.getEmail(), createUserDto.getPhone()
        );
        if (userById) {
            throw new UserAlreadyExistsError();
        }
        const createdUser = await this._userRepository.create(createUserDto);
        const accessToken = this.getAccessToken(createdUser);
        return new UserCreatedDto()
            .setAccessToken(accessToken)
            .setUser(createdUser);
    }

    async updateUser(updateUserDto) {
        const user = await this._userRepository.getById(updateUserDto.getId());
        if (!user) {
            throw new UserNotFoundError();
        }
        if (updateUserDto.getEmail() || updateUserDto.getPhone()) {
            const foundUser = await this._userRepository.getByEmailOrPhone(
                updateUserDto.getEmail(), updateUserDto.getPhone()
            );
            if (foundUser) {
                throw new UserAlreadyExistsError();
            }
        }

        return await this._userRepository.update(updateUserDto);
    }

    getAccessToken(user) {
        return jwt.sign({
            id: user.id,
            type: user.type,
            email: user.email,
            phone: user.phone
        }, process.env.JWT_SECRET);
    }
}

module.exports = UserService;