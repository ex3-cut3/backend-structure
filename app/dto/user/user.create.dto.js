class UserCreateDto {
    id = null;
    type = null;
    city = null;
    email = null;
    phone = null;
    name = null;

    setId(id) {
        this.id = id;
        return this;
    }
    getId() {
        return this.id;
    }
    setType(type) {
        this.type = type;
        return this;
    }
    getType() {
        return this.type;
    }
    setEmail(email) {
        this.email = email;
        return this;
    }
    getEmail() {
        return this.email;
    }
    setPhone(phone) {
        this.phone = phone;
        return this;
    }
    getPhone() {
        return this.phone;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    getName() {
        return this.name;
    }
    setCity(city) {
        this.city = city;
        return this;
    }
    getCity() {
        return this.city;
    }
}

module.exports = UserCreateDto;