import * as angular from "angular";
import * as fastdom from 'FastDom';

class StickyNavDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new StickyNavDirective();
    }

    public restrict: string = "C";

    public link(
        $scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attr: ng.IAttributes,
    ): void {
        update(element[0] as HTMLElement);
    }
}

export const stickyNav = angular.module('stickyNav', []);
stickyNav.directive('stickyNav', StickyNavDirective.instance);

interface IScrollPosY {
    scrollPosY: number;
}

function update(element: HTMLElement, scrollPos: IScrollPosY = {scrollPosY: 0}) {
    const newScrollPos: IScrollPosY = {scrollPosY: 0};
    fastdom.measure(() => {
        newScrollPos.scrollPosY = window.scrollY;
        const scrollDirection = newScrollPos.scrollPosY - scrollPos.scrollPosY;
        if (scrollDirection) {
            fastdom.mutate(() => {
                if (scrollDirection > 0) {
                    element.classList.add('sticky-nav--hidden');
                    element.classList.remove('sticky-nav--shown');
                } else if (scrollDirection < 0) {
                    element.classList.remove('sticky-nav--hidden');
                    element.classList.add('sticky-nav--shown');
                }
            });
        }
    });
    window.requestAnimationFrame(() => {
        update(element, newScrollPos);
    });
}
