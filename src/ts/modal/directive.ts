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
        <div class="tea-modal__close-btn" ng-click="vm.opened = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 36 36">
            <path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"/>
          </svg>
        </div>
        <div class="tea-modal__content" ng-transclude></div>
      </div>
     </div>
   `;
  public transclude: boolean = true;
}

export const modal = angular.module('modal', []);
modal.directive('modal', ModalDirective.instance);
