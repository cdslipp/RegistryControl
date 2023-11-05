import { get } from "svelte/store";
import { activeSliders } from "./lxStores";
import { lights } from "./lxStores";


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

/** GET CHANNEL NUMBERS
 * Fetches the array of channel numbers for a given light set name.
 * 
 * @param {string} lightSetName - The name of the light set.
 * @returns {number[] | null} - An array of channel numbers if found, or null if the light set does not exist.
 * 
 * @example
 * // Get channel numbers for the 'house' light set
 * const houseChannels = getChannelNumbers('house');
 * if (houseChannels) {
 *   console.log('House channels:', houseChannels);
 * } else {
 *   console.log('Light set not found');
 * }
 * 
 * @description
 * This function looks up the light set name in the `lights` store,
 * which contains mappings between light set names and their respective channel numbers.
 * If the light set name is found in the store, it returns the associated array of channel numbers.
 * If not found, it returns null, indicating that the light set does not exist.
 * This function is useful when you need to perform operations based on the channel numbers
 * associated with a light set, such as constructing XML commands for light control.
 */
export const getChannelNumbers = (lightSetName) => {
  const lightsConfig = get(lights);

  // Check if the lightSetName exists in the lights configuration
  if (!lightsConfig.hasOwnProperty(lightSetName)) {
    console.error(`No light set found with the name: ${lightSetName}`);
    return null;
  }

  // Return the array of channel numbers for the specified light set
  console.log(`Found light set: ${lightSetName}`,lightsConfig[lightSetName]);
  return lightsConfig[lightSetName];
};
