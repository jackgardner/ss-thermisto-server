'use strict';
const enums = require('../enums');

module.exports = class Player {
  constructor (id) {
    this._id = id;
    this.name = `An anonymous fool #${this._id}`;
    this.skills = enums.CHARACTER_SKILLS.map((skill) => { return { _id: skill._id, name: skill.label, currentValue: 0 } });
  }
};