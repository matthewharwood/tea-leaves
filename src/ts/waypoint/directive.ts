import * as angular from "angular";
import * as fastdom from 'FastDom';

const ACTIVE_CLASS = 'waypoint--active';
const THRESHOLD = 0.1;

class WaypointDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new WaypointDirective();
    }

    public restrict: string = "C";

    public link(
        $scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attr: ng.IAttributes,
    ): void {
        const keepDown: boolean = !('keepDown' in attr);
        const keepUp: boolean = !('keepUp' in attr);
        update(element[0] as HTMLElement, keepDown, keepUp);
    }
}

export const waypoint = angular.module('waypoint', []);
waypoint.directive('waypoint', WaypointDirective.instance);

function update(element: HTMLElement, keepDown, keepUp) {
    fastdom.measure(() => {
        const distanceFromCenter = getDistanceFromWindowCenter(element);
        const thresholdDistance = window.innerHeight * THRESHOLD;
        fastdom.mutate(() => {
            if (
                (Math.abs(distanceFromCenter) <= thresholdDistance) ||
                (distanceFromCenter > 0 && keepDown) ||
                (distanceFromCenter < 0 && keepUp)
            ) {
                element.classList.add(ACTIVE_CLASS);
            } else {
                element.classList.remove(ACTIVE_CLASS);
            }
        });
    });

    window.requestAnimationFrame(() => {
        update(element, keepDown, keepUp);
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
