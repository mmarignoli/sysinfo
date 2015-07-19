import Ember from 'ember';

export default Ember.Component.extend({
  chart: function(){
    return AmCharts.makeChart("cpu-gauge", {
    	"type": "gauge",
      "panEventsEnabled": false,
    	"arrows": [
    		{
    		}
    	],
    	"axes": [
    		{
    			"bottomText": "Cpu Usage",
    			"bottomTextYOffset": -20,
    			"endValue": 100,
    			"id": "GaugeAxis-1",
    			"valueInterval": 10,
    			"bands": [
    				{
    					"color": "#00CC00",
    					"endValue": 25,
    					"id": "GaugeBand-1",
    					"startValue": 0
    				},
    				{
    					"color": "#ffac29",
    					"endValue": 75,
    					"id": "GaugeBand-2",
    					"startValue": 25
    				},
    				{
    					"color": "#ea3838",
    					"endValue": 100,
    					"id": "GaugeBand-3",
    					"innerRadius": "95%",
    					"startValue": 75
    				}
    			]
    		}
    	],
    	"allLabels": [],
    	"balloon": {},
    	"titles": [
    		{
    			"id": "Title-1",
    			"size": 15,
    			"text": "Cpu Usage"
    		}
    	]
    })
  }.property(),
  didInsertElement: function(){
    console.log("Iserted element g");
    this.get('chart');
    // this.get('chart').arrows[0].setValue(25);
  },
  didUpdateAttrs: function(){
    this.get('chart').arrows[0].setValue(this.get('dataProvider'));
  },
});
