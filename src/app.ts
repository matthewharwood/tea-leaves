import * as angular from 'angular';

import { fade } from './ts/fade/directive';
import { frenchOak } from './ts/french-oak/directive';
import { modal } from './ts/modal/directive';
import { parallax } from './ts/parallax/directive';
import { splash } from './ts/splash/directive';
import { stickyNav } from './ts/sticky_nav/directive';
import { waypoint } from './ts/waypoint/directive';
import { wipe } from './ts/wipe/directive';

const app = angular.module('app', [
  fade.name,
  frenchOak.name,
  modal.name,
  parallax.name,
  splash.name,
  stickyNav.name,
  waypoint.name,
  wipe.name,
]);
