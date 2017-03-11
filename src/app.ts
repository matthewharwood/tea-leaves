import * as angular from "angular";
import {parallax} from './ts/parallax/directive';
import {stickyNav} from './ts/sticky_nav/directive';

const module = angular.module('app', [
    parallax.name,
    stickyNav.name,
]);
