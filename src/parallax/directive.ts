import * as fastdom from 'FastDom';
import * as angular from "angular";

class ParallaxDirective implements ng.IDirective {
    restrict = "C";

    link(
        $scope: ng.IScope,
        elm: ng.IAugmentedJQuery,
        attr: ng.IAttributes
    ): void {
        const element: ng.IAugmentedJQuery = angular.element(elm);
        const speed: number = 1 - parseFloat(attr.speed);
        update(<HTMLElement>element[0], speed);
    }

    static instance(): ng.IDirective {
        return new ParallaxDirective();
    }
}

export const parallax = angular.module('parallax', []);
parallax.directive('parallax', ParallaxDirective.instance);

function update(element: HTMLElement, speed: number) {
    fastdom.measure(() => {
        const distanceFromCenter = getDistanceFromWindowCenter(element);
        fastdom.mutate(() => {
            element.style.transform =
                `translateY(${distanceFromCenter * speed}px)`;
        });
    });
    window.requestAnimationFrame(() => {
        update(element, speed);
    });
}

function getDistanceFromWindowTop(element: HTMLElement): number {
    let total : number = element.offsetTop;
    while (element.offsetParent) {
        element = <HTMLElement>element.offsetParent;
        total += element.offsetTop - element.scrollTop;
    }
    return total;
}

function getDistanceFromWindowCenter(element: HTMLElement): number {
    return getDistanceFromWindowTop(element) - (window.innerHeight / 2) +
        (element.clientHeight / 2);
}
