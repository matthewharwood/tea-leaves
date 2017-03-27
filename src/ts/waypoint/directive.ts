import * as angular from "angular";
import * as fastdom from 'FastDom';

const ACTIVE_CLASS = 'waypoint--active';
const DEFAULT_THRESHOLD = 0.1;

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
        const activeAfter: boolean = 'activeAfter' in attr;
        const activeBefore: boolean = 'activeBefore' in attr;
        const threshold: number =
            'threshold' in attr ?
                parseFloat(attr.threshold) : DEFAULT_THRESHOLD;
        update(element[0] as HTMLElement, activeAfter, activeBefore, threshold);
    }
}

export const waypoint = angular.module('waypoint', []);
waypoint.directive('waypoint', WaypointDirective.instance);

function update(element: HTMLElement, activeAfter, activeBefore, threshold) {
    fastdom.measure(() => {

        // Jump out early on unshown things.
        if (!element.clientHeight) {
            fastdom.mutate(() => {
                element.classList.remove(ACTIVE_CLASS);
            });
            return;
        }

        const distanceFromCenter = getDistanceFromWindowCenter(element);
        const thresholdDistance = window.innerHeight * threshold;
        fastdom.mutate(() => {
            if (
                (Math.abs(distanceFromCenter) <= thresholdDistance) ||
                (distanceFromCenter < 0 && activeAfter) ||
                (distanceFromCenter > 0 && activeBefore)
            ) {
                element.classList.add(ACTIVE_CLASS);
            } else {
                element.classList.remove(ACTIVE_CLASS);
            }
        });
    });

    window.requestAnimationFrame(() => {
        update(element, activeAfter, activeBefore, threshold);
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
