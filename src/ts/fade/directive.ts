import * as angular from "angular";
import * as fastdom from 'FastDom';

const WAYPOINT_ACTIVE_CLASS = 'waypoint--active';
const DEFAULT_SPEED = 0.1;

class fadeDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new fadeDirective();
    }

    public restrict: string = "C";

    public link(
        $scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attr: ng.IAttributes,
    ): void {
        const fadeSpeed: number =
            'fadeSpeed' in attr ? parseFloat(attr.fadeSpeed) : DEFAULT_SPEED;
        update(element[0] as HTMLElement, fadeSpeed);
    }
}

export const fade = angular.module('fade', []);
fade.directive('fade', fadeDirective.instance);

function update(element: HTMLElement, fadeSpeed: number) {
    fastdom.measure(() => {
        const isActive = element.classList.contains(WAYPOINT_ACTIVE_CLASS);
        let opacity: number = parseFloat(element.style.opacity);
        if (isNaN(opacity)) {
            opacity = 1;
        }

        const newOpacity =
            Math.min(
                1, Math.max(0, opacity + (isActive ? fadeSpeed : -fadeSpeed)));

        if (
            (isActive && opacity < 1) ||
            (!isActive && opacity > 0)
        ) {
            fastdom.mutate(() => {
                element.style.opacity = newOpacity + '';
            });
        }
    });

    window.requestAnimationFrame(() => {
        update(element, fadeSpeed);
    });
}
