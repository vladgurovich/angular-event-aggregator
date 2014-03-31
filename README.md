angular-event-aggregator
================

scope-independent AngularJS Event Aggregator service inspired by Backbones event aggregator.

## Usage

Include `angular-event-aggregator.js` after your main AngularJS script.

Specify `ngEventAggregator` as a dependency for your Angular application:

```js
var app = angular.module('myApp', ['ngEventAggregator']);
```

Now you can inject `eventAggregator` anywhere in your application, and register a listener.

```js
app.controller("MyCtrl", ['eventAggregator', function(eventAggregator){

  var myCallback = function(item) {
    console.log(item);
    eventAggregator.off('some.event.happens', myCallBack);
  };
  eventAggregator.on('some.event.happens', myCallBack);
}]);
```
or execute a trigger.
```js
app.controller("SomeOtherCtrl", ['eventAggregator', function(eventAggregator){
  eventAggregator.trigger('some.event.happens', {data: 'payload'});
}]);
```

## Testing

In order to run the unit tests, run `bower install` to get angular dependencies and `npm install` to get karma and related dependecies.

Run `karma start' to launch karma.

