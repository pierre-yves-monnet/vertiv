function PbInputCtrl($scope, $log, widgetNameFactory) {

  'use strict';

  this.name = widgetNameFactory.getName('pbInput');

    this.getMaxlength = function() {
        if ($scope.properties.realMaxLength)
            return $scope.properties.realMaxLength;
        return 99999;
    }
    
  this.checkValue = function () {
      console.log("widgetInputPlus : checkValue ["+ $scope.properties.label+"] value=="+$scope.properties.value)
      // HTML 5 : if the type==email, then HTML5 delete the attribut when the name is not correct (but it keep the value in the widget ( ? )
      // So, in that circunstance, do not set the value to null: this will delete the value in the widget
      if (typeof $scope.properties.value === 'undefined')
          $scope.properties.value=null;
  }
  
  
    
  this.checkValueOnChange = function() {
       console.log("widgetInputPlus : checkValueOnChange ["+ $scope.properties.label+"] value=="+$scope.properties.value)
       // HTML 5 + type==email : not the correct moment to check the undefined or not, because HTML 5 delete the attribut
       // so, it will be undefined. If we force it to null, it will reset the field
  }
  if (!$scope.properties.isBound('value')) {
    $log.error('the pbInput property named "value" need to be bound to a variable');
  }
  
  $scope.$watch( $scope.properties.value, function(value) {
     // console.log("widgetInputPlus : watch ["+ $scope.properties.label+"] value=="+$scope.properties.value)
     // this is the only moment with html 5 + email that you can set the attribut.
     if (typeof $scope.properties.value === 'undefined')
          $scope.properties.value=null;
  });
}
