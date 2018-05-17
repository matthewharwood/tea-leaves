import * as angular from 'angular';
import * as slick from 'slick-carousel';
import * as angularTouch from 'angular-touch';
import * as angularSlick from 'angular-slick';
import * as $ from 'jquery';

import { fade } from './ts/fade/directive';
import { fluc } from './ts/fluc-curtain/directive';
import { frenchOak } from './ts/french-oak/directive';
import { modal } from './ts/modal/directive';
import { parallax } from './ts/parallax/directive';
import { quotes } from './ts/quotes/directive';
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
  fluc.name,
  frenchOak.name,
  modal.name,
  mobileNavigation.name,
  parallax.name,
  quotes.name,
  splash.name,
  stickyNav.name,
  waypoint.name,
  wipe.name,
]);

app.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'https://player.vimeo.com/video/180103049?autoplay=1&color=d2c0ac&title=0&byline=0&portrait=0',
    'https://player.vimeo.com/video/182721968?autoplay=1&color=d2c0ac&title=0&byline=0&portrait=0',
    'https://player.vimeo.com/video/178613490?autoplay=1&color=d2c0ac&title=0&byline=0&portrait=0',
    'https://player.vimeo.com/video/178954387?autoplay=1&color=d2c0ac&title=0&byline=0&portrait=0',
    'https://player.vimeo.com/video/117297484?autoplay=1&color=d2c0ac&title=0&byline=0&portrait=0',
    'https://player.vimeo.com/video/159517608?autoplay=1&color=d2c0ac&title=0&byline=0&portrait=0',
    'https://player.vimeo.com/video/124157232?autoplay=1&color=d2c0ac&title=0&byline=0&portrait=0',
    'https://player.vimeo.com/video/118042878?autoplay=1&color=d2c0ac&title=0&byline=0&portrait=0',
    'https://player.vimeo.com/video/121922093?autoplay=1&color=d2c0ac&title=0&byline=0&portrait=0',
    'self',
  ]);
}]);


app.controller('appCtrl', ['$rootScope', '$scope',
  function ($rootScope, $scope) {

    let vm = $scope;
    vm.bodyScroll = false;

    $rootScope.$on('bodyScroll', function (event, msg) {
      vm.bodyScroll = msg;
    });

    vm.selectedEvent = null;

    vm.$watch('selectedEvent', function() {
      if (vm.selectedEvent) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'initial';
      }
    });

    vm.events = [
      {
        name: 'Barrel Aged Tasting at The Battery SF',
        date: 'Thursday, June 14th at 6:00pm to 7:30pm',
        venue: 'The Battery',
        location: '717 Battery St. SF CA',
        imgLink: 'assets/images/tastings-events/Event2.jpg',
        withRiedel: false,
        ageRestriction: false,
        details: 'Tradition meets innovation with with TEALEAVES x Rudd Cabernet French Oak Barrel Aged Tea: precious white tea leaves scented with jasmine blossoms in the Imperial method, aged in a French Oak Barrel – the same that once housed the 2010 Rudd Oakville Estate vintage.',
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=http://rudd.tealeaves.com',
        twitter: 'https://twitter.com/intent/tweet?text=Explore%20%23Wine%20%26%20%23Tea%20%23Tastings%20ft.%20%40tealeavesco%20x%20%23RuddEstate%20%23BarrelAgedTealeaves%20%26%20%40RiedelUSA%3A%20bit.ly%2F2n90xiZ%20%23winetea%20%23riedel',
      },
    ];

  }
]);
