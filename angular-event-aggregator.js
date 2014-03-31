(function(window, angular, undefined) {
  'use strict';
  angular.module('ngEventAggregator', [])
  .factory('eventAggregator', [ function () {

    var _eventsWithCallbacks;

    function on(event, callback) {
      if(angular.isUndefined(_eventsWithCallbacks)) {
        _eventsWithCallbacks = {};
      }
      var callbacks = _eventsWithCallbacks[event] || (_eventsWithCallbacks[event] = []);
      callbacks.push(callback);
    }

    function off(event, callback){
      var callbacks = _eventsWithCallbacks[event];
      if(angular.isUndefined(callbacks)) {
        return;
      }
      //iterating in reverse avoids problems when removing items
      for (var i = callbacks.length - 1; i >= 0; --i) {
        if(callbacks[i] === callback){
          callbacks.splice(i,1);
        }
      }

      if (callbacks.length === 0) {
        delete _eventsWithCallbacks[event];
      }
    }

    function trigger(event, eventObject) {
      var callbacks = _eventsWithCallbacks[event];
      if(angular.isDefined(callbacks)) {
        for (var i = 0; i < callbacks.length;  i++) {
          callbacks[i](eventObject);
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
