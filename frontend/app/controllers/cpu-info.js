import Ember from 'ember';
// import defaultTheme from '../themes/default-theme';

export default Ember.Controller.extend({
  socketService: Ember.inject.service('websockets'),
  cpuInfo: [],
  memInfo: [],
  procStore: function(){
    this.store.pushMany('proc', this.store.normalize('proc', this.get('proc')));
  }.observes('proc'),
  procList: function(){
    return Ember.ArrayProxy.createdWithMixins(Ember.SortableMixin,{
      sortProperties: ['cpu_percent'],
      sortAscending: true,
      content: this.get('proc')
    });
  }.property('proc'),
  init: function() {
    this._super.apply(this, arguments);

    /*
    * 2) The next step you need to do is to create your actual websocket. Calling socketFor
    * will retrieve a cached websocket if one exists or in this case it
    * will create a new one for us.
    */
    var socket = this.get('socketService').socketFor('ws://localhost:8888/');

    /*
    * 3) The final step is to define your event handlers. All event handlers
    * are added via the `on` method and take 3 arguments: event name, callback
    * function, and the context in which to invoke the callback. All 3 arguments
    * are required.
    */
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', function(event) {
      // anonymous functions work as well
    }, this);
  },

  myOpenHandler: function(event) {
    console.log('On open event has been called: ' + event);
  },

  myMessageHandler: function(event) {
    var payload = JSON.parse(event.data);
    this.set(payload.dataType, payload.data);
    // this.set('dataProvider', JSON.parse(event.data));
  },

  actions: {
    sendButtonPressed: function() {
      /*
      * If you need to retrieve your websocket from another function or method you can simply
      * get the cached version at no penalty
      */
      // var socket = this.get('socketService').socketFor('ws://localhost:8888/');
      // socket.send('Hello Websocket World');
      var data = JSON.parse('{"cpus":[{"usage": 9.0, "cpuid": 0}, {"usage": 2.9, "cpuid": 1}, {"usage": 5.1, "cpuid": 2}, {"usage": 3.0, "cpuid": 3}, {"usage": 2.0, "cpuid": 4}, {"usage": 1.0, "cpuid": 5}, {"usage": 13.9, "cpuid": 6}, {"usage": 1.0, "cpuid": 7}]}');

      this.store.pushPayload(data);
    }
  }
});
