import Ember from 'ember';
const levels = [
  { number: 1, totalXPRequired: 0 },
  { number: 2, totalXPRequired: 1350 },
  { number: 3, totalXPRequired: 8550 },
  { number: 4, totalXPRequired: 21420 },
  { number: 5, totalXPRequired: 41220 },
  { number: 6, totalXPRequired: 70920 },
  { number: 7, totalXPRequired: 112500 },
  { number: 8, totalXPRequired: 178335 },
  { number: 9, totalXPRequired: 243015 },
  { number: 10, totalXPRequired: 341025 },
  { number: 11, totalXPRequired: 473025 },
  { number: 12, totalXPRequired: 629775 },
  { number: 13, totalXPRequired: 827775 },
  { number: 14, totalXPRequired: 1061775 },
  { number: 15, totalXPRequired: 1345275 },
  { number: 16, totalXPRequired: 1660275 },
  { number: 17, totalXPRequired: 2020275 },
  { number: 18, totalXPRequired: 2453775 },
  { number: 19, totalXPRequired: 2939775 },
  { number: 20, totalXPRequired: 3481275 },
  { number: 21, totalXPRequired: 4111275 },
  { number: 22, totalXPRequired: 4804275 },
  { number: 23, totalXPRequired: 5530275 },
  { number: 24, totalXPRequired: 6358275 },
  { number: 25, totalXPRequired: 7258275 },
  { number: 26, totalXPRequired: 8570775 },
  { number: 27, totalXPRequired: 9935775 },
  { number: 28, totalXPRequired: 11353275 },
  { number: 29, totalXPRequired: 13201275 },
  { number: 30, totalXPRequired: 15376275 },
  { number: 31, totalXPRequired: 17842275 },
  { number: 32, totalXPRequired: 20613675 },
  { number: 33, totalXPRequired: 23704875 },
  { number: 34, totalXPRequired: 27130275 },
  { number: 35, totalXPRequired: 30904275 },
  { number: 36, totalXPRequired: 35041275 },
  { number: 37, totalXPRequired: 39555675 },
  { number: 38, totalXPRequired: 44461875 },
  { number: 39, totalXPRequired: 49774275 },
  { number: 40, totalXPRequired: 55507275 },
  { number: 41, totalXPRequired: 62107275 },
  { number: 42, totalXPRequired: 69487275 },
  { number: 43, totalXPRequired: 77362275 },
  { number: 44, totalXPRequired: 85747275 },
  { number: 45, totalXPRequired: 95119275 },
  { number: 46, totalXPRequired: 105514275 },
  { number: 47, totalXPRequired: 116968275 },
  { number: 48, totalXPRequired: 129517275 },
  { number: 49, totalXPRequired: 143197275 },
  { number: 50, totalXPRequired: 158044275 },
  { number: 51, totalXPRequired: 174094275 },
  { number: 52, totalXPRequired: 191383275 },
  { number: 53, totalXPRequired: 209947275 },
  { number: 54, totalXPRequired: 229822275 },
  { number: 55, totalXPRequired: 251044275 },
  { number: 56, totalXPRequired: 273649275 },
  { number: 57, totalXPRequired: 297673275 },
  { number: 58, totalXPRequired: 323152275 },
  { number: 59, totalXPRequired: 350122275 },
  { number: 60, totalXPRequired: 378619275 }
];

export default Ember.Controller.extend({
  serverBoost: '0%',
  sanitizedServerBoost: Ember.computed('serverBoost', function() {
    if (this.get('serverBoost')) {
      return parseInt(this.get('serverBoost').replace('%',''), 10) / 100;
    }
    else {
      return 0;
    }
  }),
  statSheetBoost: '0%',
  sanitizedStatSheetBoost: Ember.computed('statSheetBoost', function() {
    if (this.get('statSheetBoost')) {
      return parseInt(this.get('statSheetBoost').replace('%',''), 10) / 100;
    }
    else {
      return 0;
    }
  }),
  isCosmic: false,
  cosmicMultiplier: Ember.computed('isCosmic', function() {
    return this.get('isCosmic') ? 0.04 : 1;
  }),
  isCosmicWeek: false,
  cosmicWeekMultiplier: Ember.computed('isCosmicWeek', function() {
    return this.get('isCosmicWeek') ? 2 : 1;
  }),
  currentXPMultiplier: Ember.computed('sanitizedServerBoost', 'sanitizedStatSheetBoost', 'cosmicMultiplier', 'cosmicWeekMultiplier', 'isCosmic', 'isCosmicWeek', function() {
    const preCosmicXP = (1 + this.get('sanitizedServerBoost')) * (1 + this.get('sanitizedStatSheetBoost'));
    if (this.get('isCosmic')) {
      return preCosmicXP * this.get('cosmicMultiplier') * this.get('cosmicWeekMultiplier');
    }
    else {
      return preCosmicXP;
    }
  }),
  formattedCurrentXPMultiplier: Ember.computed('currentXPMultiplier', function() {
    return `${(this.get('currentXPMultiplier') * 100).toFixed(2)}%`;
  }),
  mmBoxBaseXP: 139708,
  mmBoxCurrentXp: Ember.computed('mmBoxBaseXp', 'currentXPMultiplier', function() {
    return this.get('mmBoxBaseXP') * this.get('currentXPMultiplier');
  }),
  mmBoxCurrentXpFormatted: Ember.computed('mmBoxCurrentXp', function() {
    return parseInt(this.get('mmBoxCurrentXp'), 10);
  }),
  levels: Ember.computed('mmBoxCurrentXp', function() {
    return Ember.A(levels.map((level) => {
      return Ember.Object.create(
        {
          number: level.number,
          totalXPRequired: level.totalXPRequired,
          mmBoxesRequired: Math.ceil(level.totalXPRequired / this.get('mmBoxCurrentXp'))
        }
      );
    }));
  })

});
