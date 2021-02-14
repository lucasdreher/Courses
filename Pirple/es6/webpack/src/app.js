import Person from './person';
import { hello, bye } from './hello';
import sayHi from './hello';

const myName = 'Lucas';

const billyBob = new Person('Billy', 25);

console.log(billyBob, hello, bye);

sayHi();
