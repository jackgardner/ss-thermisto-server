module.exports = class Account {
  constructor (id, email, password) {
    this._id      = id;
    this.email    = email;
    this.password = password;
  }
}
