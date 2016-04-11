'use strict';
const enums = require('../enums');
const playerStats = require('./stats.json');

module.exports = class Player {
  constructor (id, accountid) {
    this._id = id;
    this.name = `An anonymous fool #${this._id}`;
    this.skills = enums.CHARACTER_SKILLS.map((skill) => { return { _id: skill._id, name: skill.label, currentValue: 0 } });
    // Gonna link the player to an account.
    this.accountid = accountid;
    this.skillPoints = playerStats.skillPoints;

    this.decrementSkill = this.decrementSkill.bind(this);
    this.incrementSkill = this.incrementSkill.bind(this);
  }

  _retrieveSkillFromConfig(skillId) {
    return enums.CHARACTER_SKILLS.find((skill) => skill._id === skillId);
  }

  hasAvailableSkillPoints() {
    return this.skillPoints > 0;
  }

  getPlayerSkill(skillId) {
    return this.skills.find((characterSkill) => characterSkill._id === skillId);
  }

  // Returns the public version of this class..
  getPublic(){
    var publicDetails = Object.assign({}, this);
    delete publicDetails.accountid;
    return publicDetails;
  }

  incrementSkill(skillId) {
    const skillFromConfig = this._retrieveSkillFromConfig(skillId);
    const playerSkill = this.getPlayerSkill(skillId);
    if (!this.hasAvailableSkillPoints()) return;

    if (playerSkill.currentValue < skillFromConfig.maxValue) {
      playerSkill.currentValue++;
      this.skillPoints --;
    }
  }

  decrementSkill(skillId) {
    const skillFromConfig = this._retrieveSkillFromConfig(skillId);
    const playerSkill = this.getPlayerSkill(skillId);

    if (playerSkill.currentValue > skillFromConfig.minValue) {
      playerSkill.currentValue--;
      this.skillPoints ++;
    }
  }

};
