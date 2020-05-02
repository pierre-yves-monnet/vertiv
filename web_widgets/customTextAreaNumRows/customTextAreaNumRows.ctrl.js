function PbTextAreaCtrl($scope, $log, widgetNameFactory) {

  'use strict';

  this.name = widgetNameFactory.getName('pbTextArea');


    this.getMaxlength = function() {
        if ($scope.properties.realMaxLength)
            return $scope.properties.realMaxLength;
        return 99999;
    }
    
  if (!$scope.properties.isBound('value')) {
    $log.error('the pbTextArea property named "value" need to be bound to a variable');
  }
}
