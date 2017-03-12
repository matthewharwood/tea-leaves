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

function update(element: HTMLElement, scrollPos: IStickyState = {
    scrollPosY: 0,
    translateDirection: 0,
}) {
    // TODO(angus): DEAL WITH THIS CLASS .main-nav--at-french-oak

    // Storing as object so that it can be passed by reference and updated
    // during the measure step. Less than ideal, but grabbing the new scroll Y
    // outside of the measure step would introduce jank. Unsure of consequences
    // of calling requestAnimationFrame from within measure, will revisit later
    // if time allows.
    const newScrollPos: IStickyState = {
        scrollPosY: 0,
        translateDirection: scrollPos.translateDirection,
    };
    fastdom.measure(() => {
        newScrollPos.scrollPosY = window.scrollY;
        const scrollDirection = newScrollPos.scrollPosY - scrollPos.scrollPosY;
        if (scrollDirection) {
            newScrollPos.translateDirection =
                -scrollDirection / Math.abs(scrollDirection);
        }
        if (!newScrollPos.translateDirection) {
            return;
        }
        const height = element.clientHeight;
        const currentTranslation = getTranslation(element);
        if (
            (
                currentTranslation.y === -height &&
                newScrollPos.translateDirection < 0
            ) || (
                currentTranslation.y === 0 &&
                newScrollPos.translateDirection > 0
            )
        ) {
            newScrollPos.translateDirection = 0;
            return;
        }
        fastdom.mutate(() => {
            const initialAdjustment =
                SPEED * newScrollPos.translateDirection + currentTranslation.y;
            const cappedAdjustment =
                Math.max(-height, Math.min(0, initialAdjustment));
            element.style.transform = `translateY(${cappedAdjustment}px)`;
        });
    });
    window.requestAnimationFrame(() => {
        update(element, newScrollPos);
    });
}
