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
        name: 'Tea & Wine Tasting With Riedel Glass',
        date: null,
        venue: null,
        location: null,
        imgLink: 'assets/images/tastings-events/Event1.jpg',
        withRiedel: true,
        ageRestriction: true,
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=http://rudd.tealeaves.com',
        twitter: 'https://twitter.com/intent/tweet?text=Explore%20%23Wine%20%26%20%23Tea%20%23Tastings%20ft.%20%40tealeavesco%20x%20%23RuddEstate%20%23BarrelAgedTealeaves%20%26%20%40RiedelUSA%3A%20bit.ly%2F2n90xiZ%20%23winetea%20%23riedel',
      },
      {
        name: 'Blending & Craftsmanship Talk',
        date: null,
        venue: null,
        location: null,
        imgLink: 'assets/images/tastings-events/Event2.jpg',
        withRiedel: false,
        ageRestriction: false,
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=http://rudd.tealeaves.com',
        twitter: 'https://twitter.com/intent/tweet?text=Explore%20%23Wine%20%26%20%23Tea%20%23Tastings%20ft.%20%40tealeavesco%20x%20%23RuddEstate%20%23BarrelAgedTealeaves%20%26%20%40RiedelUSA%3A%20bit.ly%2F2n90xiZ%20%23winetea%20%23riedel',
      },
      {
        name: 'Tea & Wine Tasting With Riedel Glass',
        date: null,
        venue: null,
        location: null,
        imgLink: 'assets/images/tastings-events/Event3.jpg',
        withRiedel: false,
        ageRestriction: true,
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=http://rudd.tealeaves.com',
        twitter: 'https://twitter.com/intent/tweet?text=Explore%20%23Wine%20%26%20%23Tea%20%23Tastings%20ft.%20%40tealeavesco%20x%20%23RuddEstate%20%23BarrelAgedTealeaves%20%26%20%40RiedelUSA%3A%20bit.ly%2F2n90xiZ%20%23winetea%20%23riedel',
      },
      {
        name: 'Blending & Craftsmanship Talk With Riedel Glass',
        date: null,
        venue: null,
        location: null,
        imgLink: 'assets/images/tastings-events/event-4.png',
        withRiedel: true,
        ageRestriction: false,
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=http://rudd.tealeaves.com',
        twitter: 'https://twitter.com/intent/tweet?text=Explore%20%23Wine%20%26%20%23Tea%20%23Tastings%20ft.%20%40tealeavesco%20x%20%23RuddEstate%20%23BarrelAgedTealeaves%20%26%20%40RiedelUSA%3A%20bit.ly%2F2n90xiZ%20%23winetea%20%23riedel',
      },
    ];

  }
]);
