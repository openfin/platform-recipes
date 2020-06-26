import { PlatformConstructor, PlatformMixin } from './mixin';
import Foo from './mixins/foo';
import createExternalWindowMixin from './mixins/ExternalWindowSnapshots';
import type { PlatformProvider } from '../node_modules/hadouken-js-adapter/src/shapes/Platform';

export default function composeMixins(...args: PlatformMixin[]) {
    return async function overrideCallback(Provider: PlatformConstructor): Promise<PlatformProvider> {
        const Composed = await args.reduce(
            async (prev: ReturnType<PlatformMixin>, Override) => Override(await prev),
            Provider
        );
        return new Composed();
    };
}

export { Foo, createExternalWindowMixin };
