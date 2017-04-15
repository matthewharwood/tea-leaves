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

        let isFading = false;
        const scrollEvents = [
            'mousedown',
            'touchmove',
            'scroll',
            'wheel',
            'keydown',
        ];
        element[0].style.position = 'fixed';

        function startFading(event) {
            eatEvent(event);
            if (!isFading) {
                isFading = true;
                element[0].classList.add('splash--invisible');
                setTimeout(() => {
                    element[0].style.display = 'none';
                    scrollEvents.forEach((event) => {
                        angular.element(document).off(event, startFading);
                    });
                }, SPLASH_ANIM_TIME);
            }
        }

        if (document.body.scrollTop || document.scrollingElement.scrollTop) {
            element[0].style.display = 'none';
        } else {
            scrollEvents.forEach((event) => {
                angular.element(document).on(event, startFading);
            });
        }
    }
}

export const splash = angular.module('splash', []);
splash.directive('splash', SplashDirective.instance);
