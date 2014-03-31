(function(window, angular, undefined) {
  'use strict';
   // declaring the module in one file / anonymous function
   angular.module('ngEventAggregator', [])
   .factory('eventAggregator', [ function () {
    var _eventListeners;

    function on(eventName, callback) {
      if(angular.isUndefined(_eventListeners)) {
        _eventListeners = {};
      }
      var eventListeners = _eventListeners[eventName] || (_eventListeners[eventName] = []);
      eventListeners.push(callback);
    }

    function off(eventName, callback){
      var eventListeners = _eventListeners[eventName];
      if(angular.isUndefined(eventListeners)) {
        return;
      }
      //iterating in reverse avoids problems when removing items
      for (var i = eventListeners.length - 1; i >= 0; --i) {
        if(eventListeners[i] === callback){
          eventListeners.splice(i,1);
        }
      }
    }

    function trigger(eventName, eventObject) {
      var eventListeners = _eventListeners[eventName];
      if(angular.isDefined(eventListeners)) {
        for (var i = 0; i < eventListeners.length;  i++) {
          eventListeners[i](eventObject);
        }
      }
    }

    return {
      on: on,
      off: off,
      trigger: trigger
    };
   }]);
})(window, angular);