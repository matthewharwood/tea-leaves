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
      <li ng-click="vm.toggle()" 
        class="main-nav__item" ng-switch="vm.getOpen()">
        <p ng-switch-when="false">&#9776;</p>
        <p ng-switch-when="true">&#10006;</p>
      </li>
    </ul>

    <div ng-click="vm.close()" ng-class="{'open': vm.getOpen()}"
            class="side-name__bg--mobile">
      <div ng-class="{'open': vm.getOpen()}"
            class="side-name__container--mobile">
        <div class="side-name__container--inner">
          <ul class="inline-list side-name__list--primary">
            <li class="side-name__item--mobile">
                <a href="/" class="side-name__item--mobile__link">
                  Home
                </a>
            </li>
            <li class="side-name__item--mobile">
                <a href="about" class="side-name__item--mobile__link">
                  About
                </a>
            </li>
            <li class="side-name__item--mobile">
              <a href="tastings" class="side-name__item--mobile__link">
                Tastings
              </a>
            </li>
            <li class="side-name__item--mobile">
              <a href="http://www.tealeaves.com/rudd-cabernet-french-oak" target="_blank" class="side-name__item--mobile__link">
                Shop Now <img src="assets/images/shop/external.svg">
              </a>
            </li>
          </ul>
          <ul class="inline-list side-name__list--secondary">
            <li class="side-name__item--mobile">
                <a href="/" class="side-name__item--mobile__link">Home</a>
              </li>
            <li class="side-name__item--mobile">
              <a href="/#introduction" class="side-name__item--mobile__link">Introduction</a>
            </li>
            <li class="side-name__item--mobile">
              <a href="/#tastingnotes" class="side-name__item--mobile__link">
                Tasting Notes
              </a>
            </li>
            <li class="side-name__item--mobile">
              <a href="/#craftsmanship" class="side-name__item--mobile__link">
                Craftsmanship
              </a>
            </li>
            <li class="side-name__item--mobile">
              <a href="/#parallels" class="side-name__item--mobile__link">
                Parallels
              </a>
            </li>
            <li class="side-name__item--mobile">
              <a href="/#shop" class="side-name__item--mobile__link">Shop</a>
            </li>
            <li class="side-name__item--mobile">
              <a href="/#glasspairing" class="side-name__item--mobile__link">
                Glass Pairing
              </a>
            </li>
            <li class="side-name__item--mobile">
              <a href="/#tasteteamonials" class="side-name__item--mobile__link">
                Tasteteamonials
              </a>
            </li>
          </ul>
        
        </div>
        <div class="mobile-social-links">
            <ul class="inline-list side-name__list--social">
            <li class="side-name__item--mobile">
              <a href="/" class="side-name__item--mobile__link">
                <figure>
                  <img src="assets/images/social-media/Beige/Facebook_Beige.png" alt="">
                </figure>
              </a>
            </li>
            <li class="side-name__item--mobile">
              <a href="/" class="side-name__item--mobile__link">
                <figure>
                  <img src="assets/images/social-media/Beige/Twitter_Beige.png" alt="">
                </figure>
              </a>
            </li>
            <li class="side-name__item--mobile">
              <a href="/" class="side-name__item--mobile__link">
                <figure>
                  <img src="assets/images/social-media/Beige/Instagram_Beige.png" alt="">
                </figure>
              </a>
            </li>
            <li class="side-name__item--mobile">
              <a href="/" class="side-name__item--mobile__link">
                <figure>
                  <img src="assets/images/social-media/Beige/Pinterest_Beige.png" alt="">
                </figure>
              </a>
            </li>
            <li class="side-name__item--mobile">
              <a href="/" class="side-name__item--mobile__link">
                <figure>
                  <img src="assets/images/social-media/Beige/Vimeo_Beige.png" alt="">
                </figure>
              </a>
            </li>
          </ul>
          <ul class="inline-list side-name__list--final">
            <li class="side-name__item--mobile"><a href="http://www.tealeaves.com" class="side-name__item--mobile__link">TEALEAVES.COM</a></li>
          </ul>
          </div>
      </div>
    </div>
   `;
}

export const mobileNavigation = angular.module('mobileNavigation', []);
mobileNavigation.directive(
    'mobileNavigation', MobileNavigationDirective.instance);
