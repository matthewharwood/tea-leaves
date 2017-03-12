import * as angular from "angular";
import * as fastdom from 'FastDom';

class FrenchOakDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new FrenchOakDirective();
    }

    public restrict: string = "C";

    public link(
        $scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attr: ng.IAttributes,
    ): void {
        const nav = document.body.querySelector('.main-nav');
        update(element[0] as HTMLElement, nav);
    }
}

export const frenchOak = angular.module('frenchOak', []);
frenchOak.directive('frenchOak', FrenchOakDirective.instance);

function update(element: HTMLElement, nav) {
    fastdom.measure(() => {
        const isActive = element.classList.contains('waypoint--active');
        fastdom.mutate(() => {
            if (isActive) {
                nav.classList.add('main-nav--at-french-oak');
                nav.classList.add('sticky-nav--force-drop');
            } else {
                nav.classList.remove('main-nav--at-french-oak');
                nav.classList.remove('sticky-nav--force-drop');
            }
        });
    });

    window.requestAnimationFrame(() => {
        update(element, nav);
    });
}
