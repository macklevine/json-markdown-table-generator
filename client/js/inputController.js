angular.module('jsonMarkdownApp')
  .controller('InputController', ['$scope', 'InputService', function ($scope, InputService){
  $scope.inputRows = [
    [
      {value:'header1'}, 
      {value:'header2'}
    ],
    [
      {value:'value1'},
      {value:'value2'}
    ]
  ];
  $scope.errorResponse = false;
  $scope.textAreaVal = "table will show up here...";
  //initialize columns here.
  $scope.submitCells = function submitCells(){
    InputService.sendInputData($scope.inputRows)
      .then(function(response){
        if (response && response.data.tableString){
          var tableString = response.data.tableString;
          $scope.textAreaVal = tableString;
          $scope.errorResponse = false;
        } else {
          $scope.textAreaVal = response.data;
          $scope.errorResponse = true;
          //TODO: add a css class to textAreaVal making the input text red.
        }
      });
  }
  $scope.addColumn = function addColumn(){
    //TODO: add limit
    for (var i = 0; i < $scope.inputRows.length; i++){
      $scope.inputRows[i].push({
        value: ""
      });
    }
  };
  $scope.removeColumn = function removeColumn(){
    if($scope.inputRows[0] && $scope.inputRows[0].length >= 2){
      for(var i = 0; i < $scope.inputRows.length; i++){
        $scope.inputRows[i].pop();
      }
    }
  }
  $scope.addRow = function addRow(){
    if($scope.inputRows.length < 100){
      var rowToAdd = [];
      for(var i = 0; i < $scope.inputRows[0].length; i++){
        rowToAdd.push({
          value: ""
        });
      }
      $scope.inputRows.push(rowToAdd);
    }
  };
  $scope.removeRow = function removeRow(){
    if($scope.inputRows && $scope.inputRows.length >=3){
      $scope.inputRows.pop();
    }
  };
}]);