import './js/title-bar';
import './js/layout-form';
import './js/left-menu.js';
import './js/snapshot-form';
import { CONTAINER_ID } from './js/CONTAINER_ID';

window.addEventListener('DOMContentLoaded', () => {
    // Before .50 AI version this may throw...
    fin.Platform.Layout.init({ containerId: CONTAINER_ID });
});
export default CONTAINER_ID;
