import * as angular from 'angular';
import * as slick from 'slick-carousel';
import * as angularTouch from 'angular-touch';
import * as angularSlick from 'angular-slick';
import * as $ from 'jquery';

import { fade } from './ts/fade/directive';
import { frenchOak } from './ts/french-oak/directive';
import { modal } from './ts/modal/directive';
import { parallax } from './ts/parallax/directive';
import { splash } from './ts/splash/directive';
import { stickyNav } from './ts/sticky_nav/directive';
import { mobileNavigation } from './ts/mobile_nav/directive';
import { waypoint } from './ts/waypoint/directive';
import { wipe } from './ts/wipe/directive';

window['$'] = $;
console.log('slick', slick);
console.log('angularSlick', angularSlick);
console.log('ANGULAR TOUCH', angularTouch);

const app = angular.module('app', [
  angularSlick,
  angularTouch,
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
    });

    vm.events = [
      {
        name: 'Tea & Wine Tasting With Riedel Glass',
        date: null,
        venue: null,
        location: null,
        imgLink: 'assets/images/tastings-events/Event1.jpg',
        withRiedel: true,
        ageRestriction: true,
      },
      {
        name: 'Blending & Craftsmanship Talk',
        date: null,
        venue: null,
        location: null,
        imgLink: 'assets/images/tastings-events/Event2.jpg',
        withRiedel: false,
        ageRestriction: false,
      },
      {
        name: 'Tea & Wine Tasting With Riedel Glass',
        date: null,
        venue: null,
        location: null,
        imgLink: 'assets/images/tastings-events/Event3.jpg',
        withRiedel: false,
        ageRestriction: true,
      },
      {
        name: 'Blending & Craftsmanship Talk Featuring Riedel Glass',
        date: null,
        venue: null,
        location: null,
        imgLink: 'assets/images/tastings-events/event-4.png',
        withRiedel: true,
        ageRestriction: false,
      },
    ];

  }
]);
