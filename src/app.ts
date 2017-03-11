import * as angular from "angular";
import {parallax} from './parallax/directive';

const module = angular.module('app', [
    parallax.name,
]);
