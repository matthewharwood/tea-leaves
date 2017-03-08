import { Directive } from './scaffolding/directive';

@Directive({selector: 'wow'})
class App{}
var x = new App();
console.log(x);
