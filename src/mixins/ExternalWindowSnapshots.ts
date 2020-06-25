import { PlatformConstructor, PlatformMixin } from '../mixin';
import { PlatformProvider } from '../../node_modules/hadouken-js-adapter/src/shapes/Platform';

async function getExternalWindowByNameTitle(name, title) {
    const externalWindows = await fin.System.getAllExternalWindows();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const externalWin = externalWindows.find((w) => w.name === name && w.title === title);
    if (externalWin) {
        return fin.ExternalWindow.wrap(externalWin);
    }

    return undefined;
}

async function getExternalWindowInfo(name, title) {
    const exWin = await getExternalWindowByNameTitle(name, title);

    if (exWin) {
        return exWin.getInfo();
    }
    return undefined;
}

async function generateExternalWindowSnapshot(externalWins) {
    return Promise.all(externalWins.map((i) => getExternalWindowInfo(i.name, i.title)));
}

async function restoreExternalWindowPositionAndState(info) {
    const exWin = await getExternalWindowByNameTitle(info.name, info.title);
    if (exWin) {
        const bounds = {
            top: info.bounds.y,
            left: info.bounds.x,
            ...info.bounds
        };
        if (info.maximized) {
            await exWin.maximize();
        }
        if (info.minimized) {
            await exWin.minimize();
        }
        if (!info.maximized && !info.minimized) {
            await exWin.restore();
        }
        await exWin.setBounds(bounds);
    }
}

/**
 * @example
 * ```
 * const externalWindowsToTrack = [
 *     {
 *         name: 'Notepad',
 *         title: 'my_platform_notes - Notepad'
 *     }
 * ];
 * fin.Platform.init({
 *    overrideCallback: composeMixins(
 *        Foo,
 *        createExternalWindowMixin(externalWindowsToTrack)
 *    )
 * })
 * ```
 * @param externalWindowsToTrack configuration at mixin creation time
 * @returns Mixin which tracks external windows in snapshots
 */
const createExternalWindowMixin = (externalWindowsToTrack: { name: string; title: string }[]): PlatformMixin => (
    Provider: PlatformConstructor
) => {
    return class Override extends Provider {
        async getSnapshot(...args: Parameters<PlatformProvider['getSnapshot']>) {
            const snapshot = await super.getSnapshot(...args);

            // we add an externalWindows section to our snapshot
            const externalWindows = await generateExternalWindowSnapshot(externalWindowsToTrack);
            return {
                ...snapshot,
                externalWindows
            };
        }

        async applySnapshot({ snapshot, options }) {
            const originalPromise = super.applySnapshot({ snapshot, options });

            // if we have a section with external windows we will use it.
            if (snapshot.externalWindows) {
                await Promise.all(snapshot.externalWindows.map(async (i) => restoreExternalWindowPositionAndState(i)));
            }

            return originalPromise;
        }
    };
};

export default createExternalWindowMixin;
