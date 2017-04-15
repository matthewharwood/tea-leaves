import * as angular from "angular";

const FLUC_ANIM_TIME = 100;

class FlucDirective implements ng.IDirective {
    public static instance(): ng.IDirective {
        return new FlucDirective();
    }

    public restrict: string = "C";

    public link(
        $scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attr: ng.IAttributes,
    ): void {
        console.log('Raising the curtain');
        element[0].classList.add('fluc-curtain--raised');
        setTimeout(() => {
            console.log('Curtain raised');
            element[0].style.display = 'none';
        }, FLUC_ANIM_TIME);
    }
}

export const fluc = angular.module('fluc', []);
fluc.directive('flucCurtain', FlucDirective.instance);
