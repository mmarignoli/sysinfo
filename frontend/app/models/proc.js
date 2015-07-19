import DS from 'ember-data';

export default DS.Model.extend({
  cpu_percent: DS.attr(),
  pid: DS.attr(),
  exe: DS.attr(),
  cmdline: DS.attr(),
  username: DS.attr()
});
