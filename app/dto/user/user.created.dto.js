class UserCreatedDto {
    accessToken = null;
    user = null;

    setAccessToken(token) {
        this.accessToken = token;
        return this;
    }
    getAccessToken() {
        return this.accessToken;
    }
    setUser(user) {
        this.user = user;
        return this;
    }
    getUser() {
        return this.user;
    }
}

module.exports = UserCreatedDto;