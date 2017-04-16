import * as angular from "angular";
import * as fastdom from 'FastDom';
import {getTranslation} from '../handies/get-translation';
import {slider} from './slider';

class WipeDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new WipeDirective();
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

export const wipe = angular.module('wipe', [
    slider.name,
]);
wipe.directive('wipe', WipeDirective.instance);

function update(element: HTMLElement) {
    fastdom.measure(() => {
        const handle: Element = element.querySelector('.wipe-slider');
        const translateX: number = getTranslation(handle as Element).x;

        const leftSection: HTMLElement =
            element.querySelector('.wipe__section--left') as HTMLElement;
        const rightSection: HTMLElement =
            element.querySelector('.wipe__section--right') as HTMLElement;

        const leftSectionContainer: HTMLElement =
            element.querySelector(
                '.wipe__section--left > .wipe__section-container') as HTMLElement;
        const rightSectionContainer: HTMLElement =
            element.querySelector(
                '.wipe__section--right > .wipe__section-container') as HTMLElement;

        fastdom.mutate(() => {
            leftSection.style.transform =
                `translate3d(calc(-50% + ${translateX}px), 0, 0)`;
            rightSection.style.transform =
                `translate3d(calc(50% + ${translateX}px), 0, 0)`;
            leftSectionContainer.style.transform =
                `translate3d(calc(50% - ${translateX}px), 0, 0)`;
            rightSectionContainer.style.transform =
                `translate3d(calc(-50% - ${translateX}px), 0, 0)`;
        });
    });
    window.requestAnimationFrame(() => {
        update(element);
    });
}
