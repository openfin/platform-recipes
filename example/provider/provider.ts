import composeMixins, { Foo, createExternalWindowMixin } from '../../src/index';

// example
const externalWindowsToTrack = [
    {
        name: 'Notepad',
        title: 'my_platform_notes - Notepad'
    }
];
fin.Platform.init({
    overrideCallback: composeMixins(Foo, createExternalWindowMixin(externalWindowsToTrack))
});
