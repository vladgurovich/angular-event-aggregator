(function() {
  'use strict';
  describe('eventAggregator', function(){
    var eventAggregator;
    beforeEach(function(){

      module('ngEventAggregator');
      inject(function(_eventAggregator_) {
        eventAggregator = _eventAggregator_;
      });
    });

    describe('with event callbacks added',function(){
      var callback,
        someOtherCallback,
        EVENT='EVENT',
        SOME_OTHER_EVENT='SOME_OTHER_EVENT';

      beforeEach(function(){
        callback = jasmine.createSpy('callback');
        someOtherCallback = jasmine.createSpy('otherCallback');
        eventAggregator.on(EVENT, callback);
        eventAggregator.on(SOME_OTHER_EVENT, someOtherCallback);
      });
      afterEach(function() {
         eventAggregator.off(EVENT, callback);
         eventAggregator.off(SOME_OTHER_EVENT, someOtherCallback);
      });

      describe('triggering an event once', function(){
        beforeEach(function(){
          eventAggregator.trigger(EVENT);
        });
        it('should execute the callback once', function(){
          expect(callback).toHaveBeenCalled();
          expect(callback.callCount).toEqual(1);
        });
        it('should not execute some other callback', function(){
          expect(someOtherCallback).not.toHaveBeenCalled();
        });
      });

      describe('triggering an event twice', function(){
        beforeEach(function(){
          eventAggregator.trigger(EVENT);
          eventAggregator.trigger(EVENT);
        });
        it('should execute the callback twice', function(){
          expect(callback).toHaveBeenCalled();
          expect(callback.callCount).toEqual(2);
        });
        it('should not execute some other callback', function(){
          expect(someOtherCallback).not.toHaveBeenCalled();
        });
      });
      describe('triggering that event with an argument', function(){
        var someObject = {owners: 2, name: 'someObject'};
        beforeEach(function(){
          eventAggregator.trigger(EVENT,someObject);
        });
        it('should execute the callback with that argument', function(){
          expect(callback).toHaveBeenCalledWith(someObject);
        });
      });
      describe('triggering some other event', function(){
        beforeEach(function(){
         eventAggregator.trigger(SOME_OTHER_EVENT);
        });
        it('should not execute the callback', function(){
           expect(callback).not.toHaveBeenCalled();
        });
        it('should execute some other callback', function(){
          expect(someOtherCallback).toHaveBeenCalled();
        });
      });

      describe('and then same callback removed', function(){
        beforeEach(function(){
          eventAggregator.off(EVENT, callback);
        });
        describe('triggering that event', function(){
          beforeEach(function(){
            eventAggregator.trigger(EVENT);
          });
          it('should not execute the callback', function(){
            expect(callback).not.toHaveBeenCalled();
          });
        });
      });

      describe('and then some other callback removed', function(){
        beforeEach(function(){
          eventAggregator.off(SOME_OTHER_EVENT, someOtherCallback);
        });
        describe('triggering that event', function(){
          beforeEach(function(){
            eventAggregator.trigger(EVENT);
          });
          it('should execute the callback', function(){
            expect(callback).toHaveBeenCalled();
          });
        });
      });


    });
  });
})();