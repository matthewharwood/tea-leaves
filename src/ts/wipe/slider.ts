import * as angular from "angular";
import * as fastdom from 'FastDom';
import {getTranslation} from '../handies/get-translation';

const PADDING = 75;

interface IToggle {
    toggle: boolean;
    offset: number;
    currX: number;
}

class SliderDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new SliderDirective();
    }

    public restrict: string = "C";

    public link(
        $scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attr: ng.IAttributes,
    ): void {
        const toggle = {
            currX: 0,
            downX: 0,
            offset: null,
            toggle: false,
        };
        const handle = element[0].querySelector('.wipe-slider__handle');
        angular.element(handle).bind('mousedown', (event) => {
            toggle.downX = event.clientX;
            toggle.offset = null;
            toggle.toggle = true;
            event.preventDefault();
        });
        angular.element(document).bind('mousemove', (event) => {
            toggle.currX = event.clientX;
        });
        angular.element(document).bind('mouseup', () => {
            toggle.toggle = false;
        });
        update(element[0] as HTMLElement, toggle);
    }
}

export const slider = angular.module('slider', []);
slider.directive('wipeSlider', SliderDirective.instance);

function update(element: HTMLElement, toggle) {
    if (toggle.toggle) {
        fastdom.measure(() => {
            if (toggle.offset == null) {
                const translateX: number = getTranslation(element as Element).x;
                toggle.offset = toggle.downX - translateX;
            }
            const maxX = (element.clientWidth / 2) - PADDING;
            const minX = -maxX;
            const finalX = Math.max(minX, Math.min(maxX, toggle.currX - toggle.offset));
            fastdom.mutate(() => {
                element.style.transform = `translateX(${finalX}px)`;
            });
        });
    }
    window.requestAnimationFrame(() => {
        update(element, toggle);
    });
}
