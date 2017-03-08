import { Directive } from './scaffolding/directive';

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

