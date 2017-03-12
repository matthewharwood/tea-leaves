import * as angular from "angular";
import {parallax} from './ts/parallax/directive';
import {stickyNav} from './ts/sticky_nav/directive';
import {waypoint} from './ts/waypoint/directive';
import {wipe} from './ts/wipe/directive';

const module = angular.module('app', [
    parallax.name,
    stickyNav.name,
    waypoint.name,
    wipe.name,
]);
