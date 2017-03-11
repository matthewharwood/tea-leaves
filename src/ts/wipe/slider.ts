import * as angular from "angular";
import * as fastdom from 'FastDom';
import {getTranslation} from '../handies/get-translation';

const PADDING = 50;
const SNAP_SPEED = 25;

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
            animating: false,
            dragging: false,
            currX: 0,
            downX: 0,
            offset: null,
        };
        const handle = element[0].querySelector('.wipe-slider__handle');
        angular.element(handle).bind('mousedown', (event) => {
            if (toggle.animating) {
                return;
            }
            toggle.downX = event.clientX;
            toggle.offset = null;
            toggle.dragging = true;
            event.preventDefault();
        });
        angular.element(document).bind('mousemove', (event) => {
            toggle.currX = event.clientX;
        });
        angular.element(document).bind('mouseup', () => {
            toggle.dragging = false;
        });

        angular.element(element).bind('mousedown', (event) => {
            if (toggle.dragging) {
                return;
            }
            toggle.animating = true;
            fastdom.measure(() => {
                const offset: number =
                    getOffset(event.clientX, element[0]) - element[0].clientWidth / 2;
                fastdom.mutate(() => {
                    slideTo(element[0], offset > 0, toggle);
                });
            });
        });

        update(element[0] as HTMLElement, toggle);
    }
}

export const slider = angular.module('slider', []);
slider.directive('wipeSlider', SliderDirective.instance);

function getOffset(mouseX: number, element: Element): number {
    const translateX: number = getTranslation(element as Element).x;
    return mouseX - translateX;
}

function getMaxX(element: Element): number {
    return (element.clientWidth / 2) - PADDING;
}

function getMinX(element: Element): number {
    return -getMaxX(element);
}

function update(element: HTMLElement, toggle) {
    if (toggle.dragging) {
        fastdom.measure(() => {
            if (toggle.offset == null) {
                toggle.offset = getOffset(toggle.downX, element);
            }
            const maxX = getMaxX(element);
            const minX = getMinX(element);
            const finalX =
                Math.max(minX, Math.min(maxX, toggle.currX - toggle.offset));
            fastdom.mutate(() => {
                element.style.transform = `translateX(${finalX}px)`;
            });
        });
    }
    window.requestAnimationFrame(() => {
        update(element, toggle);
    });
}

function slideTo(element: HTMLElement, left, toggle) {
    if (!toggle.animating) {
        return;
    }

    fastdom.measure(() => {
        const translateX: number = getTranslation(element as Element).x;

        let finalX;
        let targetX;
        if (left) {
            targetX = getMinX(element);
        } else {
            targetX = getMaxX(element);
        }

        if (translateX === targetX) {
            toggle.animating = false;
            return;
        } else if (translateX < targetX) {
            finalX = Math.min(translateX + SNAP_SPEED, targetX);
        } else {
            finalX = Math.max(translateX - SNAP_SPEED, targetX);
        }

        fastdom.mutate(() => {
            element.style.transform = `translateX(${finalX}px)`;
        });
    });
    window.requestAnimationFrame(() => {
        slideTo(element, left, toggle);
    });
}
