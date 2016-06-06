var app = angular.module('draw.controllers', []);

app.controller('HomeCtrl', function($scope, DataService,DataServiceHTTP, Weather) {

  $scope.data = {searchKey:''};

  $scope.getItemHeight = function(item, index) {
    //Make evenly indexed items be 10px taller, for the sake of example
    return 80;
  };

  /**
  *
  */
  $scope.doSearch = function() {
    console.debug("Searching for: " +  $scope.data.searchKey);

    if ( true ) {

      // use the $resource based service
      var promise = DataService.getAll( {
        'term' : $scope.data.searchKey,
        'results':'0:50',      // <-- variable substitution
        //'fields':'item_name'    <-- you can specify field params
      }).$promise;
      promise.then(function(_response) {
        console.debug(" The data " + JSON.stringify(_response));
        $scope.items = _response.hits;
      });

    } else {
      // use the $http based service
      var promise = DataServiceHTTP.getAll($scope.data.searchKey);
      promise.then(function(_response) {
        console.debug(" The data " + JSON.stringify(_response.data));
        $scope.items = _response.data.hits;
      });
    }
  };

});

/**
*
*/
app.controller('DetailCtrl', function($scope, ViewDataServiceHTTP,$stateParams) {
  var indexSearch = $stateParams.index;
  $scope.data = {searchKey: indexSearch};
  $scope.helpMe = "help me";
  var promise = ViewDataServiceHTTP.getAll($scope.data.searchKey);
  promise.then(function(_response) {
    $scope.item = _response.data;
    console.log($scope.item);
  });
});
