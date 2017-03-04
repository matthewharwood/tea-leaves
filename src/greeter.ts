/// <reference path="../types/fastdom/index.d.ts" />

import * as fastdom from 'FastDom';

console.log(fastdom.mutate());
export class Greeter {
  constructor(public greeting: string) {
  }
  public greet(): string {
    return "<h1>" + this.greeting + "</h1>";
  }
}
