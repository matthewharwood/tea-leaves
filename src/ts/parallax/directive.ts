import * as angular from "angular";
import * as fastdom from 'FastDom';

interface IParallaxDirectiveAttributes extends ng.IAttributes {
    speed: string;
    down: string;
    up: string;
}

enum Target {
    Top = 1,
    Center,
    Bottom,
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
        const stopBefore: boolean = !('stopBefore' in attr);
        const stopAfter: boolean = !('stopAfter' in attr);
        let from: Target = Target.Center;
        if ('fromTop' in attr) {
            from = Target.Top;
        } else if ('fromBottom' in attr) {
            from = Target.Bottom;
        }
        update(element[0] as HTMLElement, speed, stopBefore, stopAfter, from);
    }
}

export const parallax = angular.module('parallax', []);
parallax.directive('parallax', ParallaxDirective.instance);

function update(
    element: HTMLElement, speed: number, stopBefore: boolean = false,
    stopAfter: boolean = false, target: Target = Target.Center) {
    fastdom.measure(() => {
        let distance;
        switch (target) {
            case Target.Top:
                distance = getDistanceFromWindowTop(element);
                break;
            case Target.Center:
                distance = getDistanceFromWindowCenter(element);
                break;
            case Target.Bottom:
                distance = getDistanceFromWindowBottom(element);
                break;
            default:
                throw new Error('No valid target');
        }
        let translateY;
        if (
            (distance > 0 && !stopBefore) ||
            (distance < 0 && !stopAfter)
        ) {
            translateY = 0;
        } else {
            translateY = distance * speed;
        }

        fastdom.mutate(() => {
            element.style.transform = `translateY(${translateY}px)`;
        });
    });

    window.requestAnimationFrame(() => {
        update(element, speed, stopBefore, stopAfter, target);
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

function getDistanceFromWindowBottom(element: HTMLElement): number {
    return getDistanceFromWindowTop(element) - window.innerHeight +
        element.clientHeight;
}
