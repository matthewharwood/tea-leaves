import * as angular from 'angular';
import * as fastdom from 'FastDom';

import {IModalScope, ModalDirectiveCtrl} from './controller';

class ModalDirective implements ng.IDirective {
  public static instance(): ng.IDirective {
    return new ModalDirective();
  }

  public bindToController: boolean = true;
  public controller = ModalDirectiveCtrl;
  public controllerAs: string = 'vm';

  public restrict: string = 'E';
  public scope: {[key: string]: string} = {
    opened: '=',
  };
  public template: string = `
    <div class="tea-modal__container" ng-if="vm.opened">
      <div class="tea-modal">
        <div class="tea-modal__close-btn" ng-click="vm.opened = false">x</div>
        <div class="tea-modal__content" ng-transclude></div>
      </div>
     </div>
   `;
  public transclude: boolean = true;
}

export const modal = angular.module('modal', []);
modal.directive('modal', ModalDirective.instance);
