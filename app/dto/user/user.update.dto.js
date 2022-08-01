class UserUpdateDto {
    id = null;
    email = null;
    phone = null;
    city = null;
    name = null;

    setId(id) {
        this.id = id;
        return this;
    }

    getId() {
        return this.id;
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

module.exports = UserUpdateDto;