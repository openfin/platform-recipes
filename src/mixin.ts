import type { PlatformProvider } from '../node_modules/hadouken-js-adapter/src/shapes/Platform';

export type PlatformConstructor<T = PlatformProvider> = new () => T;

export type PlatformMixin<T = PlatformProvider> = (
    Base: PlatformConstructor
) => PlatformConstructor<T> | Promise<PlatformConstructor<T>>;
