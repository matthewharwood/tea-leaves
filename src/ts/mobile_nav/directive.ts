import * as angular from 'angular';
import * as fastdom from 'FastDom';

import {MobileNavigationDirectiveCtrl} from './controller';

class MobileNavigationDirective implements ng.IDirective {
  public static instance(): ng.IDirective {
    return new MobileNavigationDirective();
  }

  public bindToController: boolean = true;
  public controller = MobileNavigationDirectiveCtrl;
  public controllerAs: string = 'vm';

  public restrict: string = 'E';
  public scope: {[key: string]: string} = {
    opened: '=',
  };
  public template: string = `
    <ul class="main-nav__list--mobile">
      <li ng-click="vm.open()" class="main-nav__item">
        <p>&#9776; - {{}} asdf</p> 
      </li>
    </ul>

    <div ng-click="vm.close()" ng-class="{'open': vm.getOpen()}" class="side-name__bg--mobile">
      <div ng-class="{'open': vm.getOpen()}" class="side-name__containter--mobile">
        <ul class="inline-list side-name__list--primary">
          <li class="side-name__item--mobile"><a href="/about-us" class="side-name__item--mobile__link">About Us</a></li>
          <li class="side-name__item--mobile"><a href="/tasting" class="side-name__item--mobile__link">Tasting</a></li>
          <li class="side-name__item--mobile"><a href="#" class="side-name__item--mobile__link">Shop Now</a></li>
        </ul>
        <ul class="inline-list side-name__list--secondary">
          <li class="side-name__item--mobile"><a href="/" class="side-name__item--mobile__link">Home</a></li>
          <li class="side-name__item--mobile"><a href="/" class="side-name__item--mobile__link">Introduction</a></li>
          <li class="side-name__item--mobile"><a href="/" class="side-name__item--mobile__link">Tasting Notes</a></li>
          <li class="side-name__item--mobile"><a href="/" class="side-name__item--mobile__link">Craftsmanship</a></li>
          <li class="side-name__item--mobile"><a href="/" class="side-name__item--mobile__link">Parallels</a></li>
          <li class="side-name__item--mobile"><a href="/" class="side-name__item--mobile__link">Shop</a></li>
          <li class="side-name__item--mobile"><a href="/" class="side-name__item--mobile__link">Glass Pairing</a></li>
          <li class="side-name__item--mobile"><a href="/" class="side-name__item--mobile__link">Tasteamonials</a></li>
        </ul>
      </div>
    </div>
   `;
}

export const mobileNavigation = angular.module('mobileNavigation', []);
mobileNavigation.directive('mobileNavigation', MobileNavigationDirective.instance);