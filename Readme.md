# NanoEvent
The >500 Byte event emitter.

## Usage

### As a class
```js
import { NanoEvent } from '@foxycorps/nanoevent';

class MyClass extends NanoEvent {
    constructor() {
        super();
    }
}
```

### As a method

```js
import NanoEvent from '@foxycorps/nanoevent';

const myEventSystem = NanoEvent;
myEventSystem.on('type', () => console.log("called"))
```