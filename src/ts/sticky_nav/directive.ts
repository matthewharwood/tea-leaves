import * as angular from "angular";
import * as fastdom from 'FastDom';
import {getTranslation} from '../handies/get-translation';

const SPEED = 5;

class StickyNavDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new StickyNavDirective();
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

export const stickyNav = angular.module('stickyNav', []);
stickyNav.directive('stickyNav', StickyNavDirective.instance);

interface IStickyState {
    scrollPosY: number;
    translateDirection: number; // -1, 0 or 1
}

function update(element: HTMLElement, prevState: IStickyState = {
    scrollPosY: 0,
    translateDirection: 0,
}) {
    // Storing as object so that it can be passed by reference and updated
    // during the measure step. Less than ideal, but grabbing the new scroll Y
    // outside of the measure step would introduce jank. Unsure of consequences
    // of calling requestAnimationFrame from within measure, will revisit later
    // if time allows.
    const currentState: IStickyState = {
        scrollPosY: 0,
        translateDirection: prevState.translateDirection,
    };
    fastdom.measure(() => {
        currentState.scrollPosY = window.scrollY;
        const scrollDirection = getScrollDirection(currentState, prevState);

        currentState.translateDirection =
            getTranslateDirection(element, scrollDirection);
        if (!currentState.translateDirection) {
            return;
        }
        const height = element.clientHeight;
        const currentY = getTranslation(element).y;
        if (
            (currentY === -height && currentState.translateDirection < 0) ||
            (currentY === 0 && currentState.translateDirection > 0)
        ) {
            currentState.translateDirection = 0;
            return;
        }
        fastdom.mutate(() => {
            if (currentState.translateDirection >= 0) {
                element.classList.add('sticky-nav--shown');
            } else {
                element.classList.remove('sticky-nav--shown');
            }
            // const initialAdjustment =
            //     SPEED * currentState.translateDirection + currentY;
            // const cappedAdjustment =
            //     Math.max(-height, Math.min(0, initialAdjustment));
            // element.style.transform = `translate3d(0, ${cappedAdjustment}px, 0)`;
        });
    });
    window.requestAnimationFrame(() => {
        update(element, currentState);
    });
}

function getScrollDirection(newScroll, oldScroll) {
    return newScroll.scrollPosY - oldScroll.scrollPosY;
}

function getTranslateDirection(element, scrollDirection) {
    if (element.classList.contains('sticky-nav--force-drop')) {
        return 1;
    } else if (scrollDirection) {
        return -scrollDirection / Math.abs(scrollDirection);
    }
}
