import * as angular from 'angular';

import { fade } from './ts/fade/directive';
import { frenchOak } from './ts/french-oak/directive';
import { modal } from './ts/modal/directive';
import { parallax } from './ts/parallax/directive';
import { splash } from './ts/splash/directive';
import { stickyNav } from './ts/sticky_nav/directive';
import { mobileNavigation } from './ts/mobile_nav/directive';
import { waypoint } from './ts/waypoint/directive';
import { wipe } from './ts/wipe/directive';

const app = angular.module('app', [
  fade.name,
  frenchOak.name,
  modal.name,
  mobileNavigation.name,
  parallax.name,
  splash.name,
  stickyNav.name,
  waypoint.name,
  wipe.name,
]);


app.controller('appCtrl', ['$rootScope', '$scope',
  function($rootScope,$scope) {
    let vm = $scope;
    vm.bodyScroll = false;

    $rootScope.$on('bodyScroll', function(event, msg) {
      vm.bodyScroll = msg;
      console.log(vm.bodyScroll, 'wt2f');
    });

  }
]);