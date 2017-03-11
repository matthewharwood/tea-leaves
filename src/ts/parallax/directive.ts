import * as angular from "angular";
import * as fastdom from 'FastDom';

interface IParallaxDirectiveAttributes extends ng.IAttributes {
    speed: string;
}

class ParallaxDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new ParallaxDirective();
    }

    public restrict: string = "C";

    public link(
        $scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attr: IParallaxDirectiveAttributes,
    ): void {
        const speed: number = 1 - parseFloat(attr.speed);
        update(element[0] as HTMLElement, speed);
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
    let total: number = element.offsetTop;
    while (element.offsetParent instanceof HTMLElement) {
        element = element.offsetParent;
        total += element.offsetTop - element.scrollTop;
    }
    return total;
}

function getDistanceFromWindowCenter(element: HTMLElement): number {
    return getDistanceFromWindowTop(element) - (window.innerHeight / 2) +
        (element.clientHeight / 2);
}
