import * as angular from "angular";
import * as fastdom from 'FastDom';
import {getTranslation} from '../handies/get-translation';

const PADDING = 50;
const SNAP_SPEED = 50;
const FADE_SPEED = 0.05;

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
        const handle = element[0].querySelector('.wipe-slider__handle');
        const leftArrow = element[0].querySelector('.arrow-box--left');
        const rightArrow = element[0].querySelector('.arrow-box--right');
        const arrows = [leftArrow, rightArrow];

        const toggle = {
            animating: false,
            currX: 0,
            downX: 0,
            dragging: false,
            fading: false,
            offset: null,
        };

        const downEvents = ['mousedown', 'touchstart'];
        const endEvents = ['mouseup', 'touchend'];
        const moveEvents = ['mousemove', 'touchmove'];

        function getClientX(e) {
            return e.clientX || e['touches'][0].clientX;
        }

        downEvents.forEach((downEvent) => {
            angular.element(handle).bind(downEvent, (event) => {
                if (toggle.animating || toggle.dragging) {
                    return;
                }
                toggle.dragging = true;
                toggle.downX = getClientX(event);
                toggle.offset = null;
                event.preventDefault();
            });

            angular.element(element[0].offsetParent).bind(downEvent, (event) => {
                if (toggle.dragging || toggle.animating) {
                    return;
                }
                toggle.animating = true;
                fastdom.measure(() => {
                    const offset: number =
                        getOffset(getClientX(event),
                            element[0]) - element[0].clientWidth / 2;
                    fastdom.mutate(() => {
                        slideTo(element[0], offset > 0, toggle);
                    });
                });
            });
        });

        moveEvents.forEach((moveEvent) => {
            angular.element(document).bind(moveEvent, (event) => {
                toggle.currX = getClientX(event)
            });
        });

        endEvents.forEach((endEvent) => {
            angular.element(document).bind(endEvent, () => {
                console.log('ending dragging');
                toggle.dragging = false;
            });
        });

        update(element[0] as HTMLElement, toggle, arrows);
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

function update(element: HTMLElement, toggle, arrows, arrowOpacity = 1) {
    let newOpacity = arrowOpacity;
    fastdom.measure(() => {
        const maxX = getMaxX(element);
        const minX = getMinX(element);
        const currentX = getTranslation(element as Element).x;

        let finalX;
        if (toggle.dragging) {
            if (toggle.offset == null) {
                toggle.offset = getOffset(toggle.downX, element);
            }
            finalX =
                Math.max(minX, Math.min(maxX, toggle.currX - toggle.offset));
        } else {
            finalX = Math.max(minX, Math.min(maxX, currentX));
        }
        if (currentX !== finalX) {
            fastdom.mutate(() => {
                element.style.transform = `translateX(${finalX}px)`;
            });
        }
        if (arrowOpacity > 0) {
            toggle.fading =
                toggle.fading || toggle.dragging || toggle.animating;
            if (toggle.fading) {
                newOpacity = arrowOpacity - FADE_SPEED;
            }
            if (newOpacity <= 0) {
                fastdom.mutate(() => {
                    arrows.forEach((arrow) => {
                        arrow.style.display = 'none';
                    });
                });
            } else if (newOpacity !== arrowOpacity) {
                fastdom.mutate(() => {
                    arrows.forEach((arrow) => {
                        arrow.style.opacity = newOpacity;
                    });
                });
            }
        }
    });
    window.requestAnimationFrame(() => {
        update(element, toggle, arrows, newOpacity);
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
