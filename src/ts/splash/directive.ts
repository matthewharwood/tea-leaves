import * as angular from "angular";

const SPLASH_ANIM_TIME = 500;
const SPLASH_DELAY_TIME = 2000;

class SplashDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new SplashDirective();
    }

    public restrict: string = "C";

    public link(
        $scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attr: ng.IAttributes,
    ): void {

        function eatEvent(event) {
            event.preventDefault();
        }
        const scrollEvents = [
            'touchmove',
            'scroll',
            'wheel',
            'keydown',
        ];
        scrollEvents.forEach((event) => {
            angular.element(document).on(event, eatEvent);
        });

        setTimeout(() => {
            element[0].classList.add('splash--invisible');
            setTimeout(() => {
                element[0].style.display = 'none';
                scrollEvents.forEach((event) => {
                    angular.element(document).off(event, eatEvent);
                });
            }, SPLASH_ANIM_TIME);
        }, SPLASH_DELAY_TIME);
    }
}

export const splash = angular.module('splash', []);
splash.directive('splash', SplashDirective.instance);
