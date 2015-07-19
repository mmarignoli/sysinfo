import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  // location: config.locationType
});

Router.map(function() {
  this.route('cpu-info', {path: '/'});
  this.route('cpu-info', {path: '/sysinfo'});
});

export default Router;
