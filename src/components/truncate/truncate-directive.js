(function () {
  'use strict';

  angular.module('exceptionless.truncate', ['debounce'])
    .directive('truncate', function ($window, $timeout, debounce) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var truncate = debounce(function () {
            angular.element(element).trunk8({ lines: attrs.lines || 1, tooltip: (attrs.overwriteTooltip !== undefined ? attrs.overwriteTooltip === true : true) });
          }, 150);

          // TODO: Fix this bug: http://branchandbound.net/blog/web/2013/08/some-angularjs-pitfalls/
          var timeout = $timeout(truncate, 150);

          var window = angular.element($window);
          window.bind('resize', truncate);

          scope.$on('$destroy', function (e) {
            $timeout.cancel(timeout);
            window.unbind('resize', truncate);
          });
        }
      };
    });
}());
