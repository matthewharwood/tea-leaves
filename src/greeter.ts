import fastDom from "FastDom";

console.log(fastDom);
export class Greeter {
  constructor(public greeting: string) {
  }
  public greet(): string {
    return "<h1>" + this.greeting + "</h1>";
  }
}
