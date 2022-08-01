const UserGetDto = require("../dto/user/user.get.dto");
const UserCreateDto = require("../dto/user/user.create.dto");
const UserUpdateDto = require("../dto/user/user.update.dto");
const {userService} = require("../../services");
const httpCodes = require("../../constants/http");
const errorTexts = require("../../constants/error");
const userPresenter = require("../presenter/user.presenter");

exports.getUserById = async (req, res, next) => {
    try {
        const userGetDto = new UserGetDto()
            .setUserId(req.params.id);
        const user = await userService.getUserById(userGetDto);
        res.status(httpCodes.OK_HTTP_CODE).json({
            ...userPresenter(user)
        });
    } catch (e) {
        next(e);
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const userCreateDto = new UserCreateDto()
            .setCity(req.body.city ?? null)
            .setPhone(req.body.phone)
            .setName(req.body.name)
            .setEmail(req.body.email)
            .setId(req.body.id)
            .setType(req.body.type);
        const createdUser = await userService.createUser(userCreateDto);
        res.status(httpCodes.OK_HTTP_CODE).json({
            ...userPresenter(createdUser.getUser()),
            accessToken: createdUser.getAccessToken()
        });
    } catch (e) {
        next(e);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const userUpdateDto = new UserUpdateDto()
            .setId(req.params.id)
            .setCity(req.body.city ?? null)
            .setEmail(req.body.email ?? null)
            .setName(req.body.name ?? null)
            .setPhone(req.body.phone ?? null);
        const user = await userService.updateUser(userUpdateDto);
        res.status(httpCodes.OK_HTTP_CODE).json({
            ...userPresenter(user)
        });
    } catch (e) {
        next(e);
    }
}