import Ember from 'ember';

export default Ember.Component.extend({
  conversionRate: 2,
  chart: function(){
    return AmCharts.makeChart("ram-lines", {
    	"type": "serial",
    	"startDuration": 0,
      "thousandsSeparator": "",
      'sequencedAnimation': false,
    	"categoryAxis": {
    		"gridPosition": "start",
    		"axisThickness": 0,
    		"labelsEnabled": false,
    		"showFirstLabel": false,
    		"showLastLabel": false,
    		"tickLength": -1,
        "gridThickness": 0
    	},
    	"trendLines": [],
    	"graphs": [
    		{
    			"balloonText": "[[title]] of [[category]]:[[value]]",
          "fillAlphas": 0.7,
    			"id": "Used Memory",
    			"title": "Used",
    			// "type": "smoothedLine",
    			"valueField": "used"
    		},
        {
    			"balloonText": "[[title]] of [[category]]:[[value]]",
          "fillAlphas": 0.7,
    			"id": "Available Memory",
    			"title": "Available",
    			// "type": "smoothedLine",
    			"valueField": "available"
    		},
    	],
    	"guides": [],
    	"valueAxes": [
    		{
    			"id": "ValueAxis-1",
          "stackType": "regular",
    			"axisThickness": 0,
    			"labelsEnabled": true,
    			"tickLength": 0,
    			"title": ""
    		}
    	],
    	"allLabels": [],
    	"balloon": {},
    	"legend": {
    		"useGraphSettings": true
    	},
    	"titles": [
    		{
    			"id": "Title-1",
    			"size": 15,
    			"text": "Chart Title"
    		}
    	],
    	"dataProvider": []
    })
  }.property(),
  didInsertElement:function(){
    console.log("Iserted element");
    this.get('chart');
  },
  didUpdateAttrs: function(){
    for(var key in this.get('dataProvider')) {
      if(this.get('dataProvider').hasOwnProperty(key)) {
        for(var i = 0; i < this.get('conversionRate'); i++){
          this.get('dataProvider')[key] = Math.floor(this.get('dataProvider')[key]/1024);
        }
      }
    }
    // console.log(this.get('dataProvider'))
    this.get('chart').dataProvider.push(this.get('dataProvider'));
    this.get('chart').validateData();
  },
});
