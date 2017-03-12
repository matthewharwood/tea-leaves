import * as angular from "angular";
import {frenchOak} from './ts/french-oak/directive';
import {modal} from './ts/modal/directive';
import {parallax} from './ts/parallax/directive';
import {splash} from './ts/splash/directive';
import {stickyNav} from './ts/sticky_nav/directive';
import {waypoint} from './ts/waypoint/directive';
import {wipe} from './ts/wipe/directive';

const module = angular.module('app', [
    frenchOak.name,
    modal.name,
    parallax.name,
    splash.name,
    stickyNav.name,
    waypoint.name,
    wipe.name,
]);
