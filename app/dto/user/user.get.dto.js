class UserGetDto {
    userId = null;

    setUserId(userId) {
        this.userId = userId;
        return this;
    }
    getUserId() {
        return this.userId;
    }
}

module.exports = UserGetDto;