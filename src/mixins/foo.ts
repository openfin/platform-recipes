import { PlatformConstructor } from '../mixin';
import { PlatformProvider } from '../../node_modules/hadouken-js-adapter/src/shapes/Platform';
import { Constructor } from '../../node_modules/hadouken-js-adapter/src/shapes/Constructor';

interface Foo extends PlatformProvider {
    foo: () => number;
}

/**
 * A useless mixin which sets a property 'foo' on the provider
 * @param Base
 */
export default function FooMixin(Base: PlatformConstructor): Constructor<Foo> {
    return class Foo extends Base {
        #foo: number;

        constructor() {
            super();
            this.#foo = Date.now();
        }

        public foo() {
            return this.#foo;
        }
    };
}
