import Ember from 'ember';

export default Ember.Component.extend({
  chart: function(){
    return AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "startDuration": 0,
      'sequencedAnimation': false,
      "marginRight": 70,
      "dataProvider": [],
      "valueAxes": [{
        "axisAlpha": 0,
        "position": "left",
        "title": "CPU Usage",
        "minimum":0,
        "maximum":100,
        // "gridCount": 1,
        // "autoGridCount": false,
        // "labelFrequency": 1
      }],
      "startDuration": 1,
      "graphs": [{
        "balloonText": "<b>[[category]]: [[value]]</b>",
        "fillColorsField": "color",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "usage"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "cpuid",
      "categoryAxis": {
        "gridPosition": "start",
        "labelRotation": 45
      },
      "export": {
        "enabled": true
      }

    })
  }.property(),
  didInsertElement:function(){
    console.log("Iserted element");
    this.get('chart');
  },
  didUpdateAttrs: function(){
    this.get('chart').dataProvider = this.get('dataProvider');
    this.get('chart').validateData();
  },
  actions: {
    updateData: function(){
      window.foo = this.get('chart');
    }
  }
});
