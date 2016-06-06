var app = angular.module('draw.services',[]);

/**
* Factory: Search Data Services using $resource
*/
app.factory('DataService', function( $resource, nutritionixConst){
  var aSearchObject = $resource('https://api.nutritionix.com/v1_1/search/:term',{term: '@term'},{
    getAll : {
      method : 'get',
      //isArray : true,
      params : {
        results  : ':results',
        appId : nutritionixConst.appId,
        appKey  :nutritionixConst.appKey,
        // brand_id:'513fbc1283aa2dc80c00001f',
        fields : ':fields',
      }
    }
  });
  return {
    /**
    * we can specify the params, the query string and the default fields
    * to turn in the query along with the result size
    */
    getAll : function(_params) {
      var defaultFields = 'brand_id,item_name,item_id,brand_name,nf_calories,nf_total_fat';

      if (!_params.fields) {
        _params.fields = defaultFields;
      }
      return aSearchObject.getAll(_params);
    }
  }

});

/**
* Factory: Search Data Services using $http
*/
app.factory('DataServiceHTTP', function( $http, nutritionixConst){
  return {
    getAll : function(_key) {

      return $http.get('https://api.nutritionix.com/v1_1/search/' + _key,{
        'params' : {
          results  : '0:50',
          appId : nutritionixConst.appId,
          appKey  :nutritionixConst.appKey,
          fields : 'brand_id,item_name,item_id,brand_name,nf_calories,nf_total_fat'
        }
      });
    }
  }
});

/**
* Factory: View data using $http
*/
app.factory('ViewDataServiceHTTP', function( $http, nutritionixConst){
  return {
    getAll : function(_key) {

      return $http.get('https://api.nutritionix.com/v1_1/item?id=' + _key,{
        'params' : {
          appId : nutritionixConst.appId,
          appKey  :nutritionixConst.appKey
        }
      });
    }
  }
});


/**
* Factory: Weather
*/
app.factory('Weather', function($resource) {

  var API_PATH = 'http://api.openweathermap.org/data/2.5/weather';

  var Weather = $resource(API_PATH);

  return {
    getWeather: function(weatherParams) {
      return Weather.get(weatherParams, function(successResult) {
        return successResult;
      }, function(errorResult) {
        console.log(errorResult);
      });
    }
  }
});
