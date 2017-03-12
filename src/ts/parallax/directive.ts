import * as angular from "angular";
import * as fastdom from 'FastDom';

interface IParallaxDirectiveAttributes extends ng.IAttributes {
    speed: string;
    down: string;
    up: string;
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
        const isDown: boolean = !('stopDown' in attr);
        const isUp: boolean = !('stopUp' in attr);
        update(element[0] as HTMLElement, speed, isDown, isUp);
    }
}

export const parallax = angular.module('parallax', []);
parallax.directive('parallax', ParallaxDirective.instance);

function update(element: HTMLElement, speed: number, down: boolean = true, up: boolean = true) {
    fastdom.measure(() => {
        const distanceFromCenter = getDistanceFromWindowCenter(element);
        let translateY;
        if (
            (distanceFromCenter < 0 && !down) ||
            (distanceFromCenter > 0 && !up)
        ) {
            translateY = 0;
        } else {
            translateY = distanceFromCenter * speed;
        }

        fastdom.mutate(() => {
            element.style.transform = `translateY(${translateY}px)`;
        });
    });

    window.requestAnimationFrame(() => {
        update(element, speed, down, up);
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
