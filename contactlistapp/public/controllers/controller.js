var myApp = angular.module("myApp", []);

myApp.controller('AppCtrl',['$scope', '$http', function($scope, $http){
  console.log("Hello World");

var refresh = function(){
  $http.get('/contactlist').then(function(response){
        console.log(response.data);
        $scope.contactlist = response.data;
        $scope.contact = {};
  });
};

refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  $http({
        method: 'POST',
        url: '/contactlist',
        data: $scope.contact
      })
      .then(function(response) {
        $scope.contact = {}; //Clear input box
        console.log('POST Response: '+ response.statusText);
        refresh();
  });
};

$scope.remove = function(id)﻿{
  console.log(id);
  $http({
        method: 'DELETE',
        url: '/contactlist/' + id,
        data: $scope.contact
      })
      .then(function(response) {
        refresh();
  });
};

$scope.edit = function(id){
  console.log(id);
  $http({
        method: 'GET',
        url: '/contactlist/' + id,
        data: $scope.contact
      })
      .then(function(response) {
        console.log(response.data);
        $scope.contact = response.data;
  });
};

$scope.update = function(){
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact);

  refresh();
}

$scope.deselect = function(){
  $scope.contact = {};
}

}]);
