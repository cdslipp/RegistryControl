import { get } from "svelte/store";
import { activeSliders } from "./lxStores";


/**
 * @typedef {import('svelte/store').Writable} Writable
 */

/**
 * Calculate the average light level from an array of levels.
 * @param {number[]} levels - An array of light levels.
 * @returns {number} The average light level.
 */
export function calculateAverageLightLevel(levels) {
    if (!Array.isArray(levels) || levels.length === 0) return 0;
    const sum = levels.reduce((acc, level) => acc + level, 0);
    return sum / levels.length;
}

/**
 * Add a slider to the list of active sliders.
 * @param {string} setName - The name of the slider set.
 */
export function addActiveSlider(setName) {
    const currentActiveSliders = get(activeSliders);
    activeSliders.set([...currentActiveSliders, setName]);
}

/**
 * Remove the current component from the list of active sliders.
 * @param {string} setName - The name of the slider set.
 */
export function removeActiveSlider(setName) {
    const currentActiveSliders = get(activeSliders);
    activeSliders.set(currentActiveSliders.filter(set => set !== setName));
}

/**
 * Create XML commands to send to Sensor3 dimmers.
 * @param {string[]} channels - An array of channel UDNs.
 * @param {number} level - The light level to set.
 * @returns {string} The XML commands as a string.
 */
export function createLightLevelXMLCommand(channels, level) {
    const xmlCommands = channels.map(channel => `<set udn="${channel}" space="1" level="${level}" side="both"/>`).join('');
    return `<setlevels>${xmlCommands}</setlevels>`;
}

/**
 * Cleanup function for the Slider component.
 * @param {Writable<string[]>} activeSliders - The active sliders store.
 * @param {string} lightSetName - The name of the current light set.
 * @param {() => void} unsubscribe - The unsubscribe function for the store subscription.
 */
export function cleanup(activeSliders, lightSetName, unsubscribe) {
    return () => {
        const currentActiveSliders = get(activeSliders);
        activeSliders.set(currentActiveSliders.filter((set) => set !== lightSetName));
        unsubscribe();
    };
}
