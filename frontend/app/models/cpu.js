import DS from 'ember-data';

export default DS.Model.extend({
  usage: DS.attr(),
  cpuid: DS.attr()
});
