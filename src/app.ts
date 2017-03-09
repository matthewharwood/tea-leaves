import { Directive } from './scaffolding/directive';
import {appState} from './scaffolding/appState';
import * as fastdom from 'FastDom';
import {remove} from './scaffolding/directive.actions';
import * as angular from "angular";
import {parallax} from './parallax/directive';

const module = angular.module('app', [
    parallax.name,
]);

@Directive({selector: 'app'})
class App{}

@Directive({selector: 'El1'})
class El1{}

@Directive({selector: 'El2'})
class El2{}

@Directive({selector: 'El3'})
class El3{}

const x = new App();
const x1 = new El1();
const x2 = new El2();
const x3 = new El3();
appState.dispatch(remove('app'));

