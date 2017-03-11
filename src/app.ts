import * as angular from "angular";
import {parallax} from './parallax/directive';
import {stickyNav} from './sticky_nav/directive';

const module = angular.module('app', [
    parallax.name,
    stickyNav.name,
]);
