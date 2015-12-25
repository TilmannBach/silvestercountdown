(function () {
    'use strict';

    angular.module('silvestercountdown', []);

    angular.module('silvestercountdown').controller('countdownController', ['$interval', countdownController]);

    function countdownController($interval) {
        var vm = this;
        //vm.deadline = moment('2015-12-25 17:59');
        vm.deadline = moment().endOf("year");
        vm.year = vm.deadline.year()+1;
        vm.reloadInterval = 500;
        vm.deadlineExceeded = false;
        
        //internal
        var stop;
        
        //start countdown
        redrawClock();


        function redrawClock() {
            if (!angular.isDefined(stop)) {
                stop = $interval(redrawClock, vm.reloadInterval);
            }
            vm.dateTime = new Date().toLocaleTimeString();
            var diffInMs = vm.deadline.diff(moment(), 'milliseconds');
            var span = moment.duration(diffInMs);
            vm.hours = span.hours();
            vm.minutes = span.minutes();
            vm.seconds = span.seconds();
            if (span.asMilliseconds() < 0)
                vm.deadlineExceeded = true;
        }
    }

})();