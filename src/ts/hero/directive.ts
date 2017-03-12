import * as angular from "angular";
import * as fastdom from 'FastDom';

const SPLASH_ANIM_TIME = 500;
const SPLASH_DELAY_TIME = 2000;
const BOX_OPEN_ANIM_TIME = 1000;

class HeroDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new HeroDirective();
    }

    public restrict: string = "C";

    public link(
        $scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attr: ng.IAttributes,
    ): void {
        const body = document.querySelector('body');
        const splash = document.querySelector('.splash');

        function runClose() {
            close(element[0] as HTMLElement, body);
        }
        const closeEvents = [
            'touchmove',
            'scroll',
            'wheel',
            'keydown',
        ];

        body.classList.add('de-activated');
        body.scrollTop = 0;
        setTimeout(() => {
            splash.classList.add('splash--invisible');
            setTimeout(() => {
                closeEvents.forEach((event) => {
                    angular.element(document).bind(event, runClose);
                });
            }, SPLASH_ANIM_TIME);
        }, SPLASH_DELAY_TIME);
    }
}

export const hero = angular.module('hero', []);
hero.directive('hero', HeroDirective.instance);

function close(element: HTMLElement, body: HTMLElement) {
    element.classList.add('hero--animated');
    setTimeout(() => {
        body.classList.remove('de-activated');
    }, BOX_OPEN_ANIM_TIME);
}
