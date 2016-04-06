'use strict';
const enums = require('../enums');

module.exports = class Player {
  constructor (id) {
    this._id = id;
    this.name = `An anonymous fool #${this._id}`;
    this.skills = enums.CHARACTER_SKILLS.map((skill) => { return { _id: skill._id, name: skill.label, currentValue: 0 } });
  }

  _retrieveSkillFromConfig(skillId) {
    return enums.CHARACTER_SKILLS.find((skill) => skill._id === skillId);
  }

  incrementSkill(skillId) {
    var playerSkill = this.skills.find((characterSkill) => characterSkill._id === skillId);
    var skillFromConfig = this._retrieveSkillFromConfig(skillId);

    if (!playerSkill) return handleError(req, error.messages.INVALID_SKILL);
    if (playerSkill.currentValue < skillFromConfig.maxValue) {
      playerSkill.currentValue++;
    }

    console.log(playerSkill);
  }

  decrementSkill(skillId) {
    var playerSkill = this.skills.find((characterSkill) => characterSkill._id === skillId);
    var skillFromConfig = this._retrieveSkillFromConfig(skillId);

    if (!playerSkill) return handleError(req, error.messages.INVALID_SKILL);

    if (playerSkill.currentValue > skillFromConfig.minValue) {
      playerSkill.currentValue--;
    }
  }

};
