// src/lib/lx/lxApi.js
import { get } from 'svelte/store';
import { dimmerRacks, apiConfig, lights } from './lxStores';
import { xml2js } from 'xml-js';
import { getChannelNumbers } from './lxHelpers';

let lastCallTimestamp = 0;
let lastSentValues = {};

/**
 * Send XML command to dimmer racks.
 * @param {string} xmlCommand - The XML command to send.
 * @returns {Promise<Response[]>} - A promise that resolves with an array of responses from the dimmer racks.
 */
const sendCommand = async (xmlCommand) => {
    const racks = get(dimmerRacks);
    const promises = racks.map((ip) =>
        fetch(`http://${ip}/goform/dimmertest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml',
            },
            body: xmlCommand,
        })
    );
    const responses = await Promise.all(promises);
    return responses;
};

/**
 * Send XML command with rate limiting.
 * @param {string} xmlCommand - The XML command to send.
 * @returns {Promise<Response[]>} - A promise that resolves with an array of responses from the dimmer racks.
 */
const rateLimitedSendCommand = async (xmlCommand) => {
    const { minDelayBetweenCalls } = get(apiConfig);
    const now = Date.now();
    if (now - lastCallTimestamp < minDelayBetweenCalls) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                rateLimitedSendCommand(xmlCommand).then(resolve).catch(reject);
            }, minDelayBetweenCalls - (now - lastCallTimestamp));
        });
    }
    lastCallTimestamp = now;
    return sendCommand(xmlCommand);
};

/**
 * Set light level for a list of channels.
 * @param {string[] | string} channels - An array of channel UDNs or a single channel UDN.
 * @param {number} level - The light level to set.
 * @returns {Promise<void>} - A promise that resolves when the command has been sent.
 */
export const setLightLevel = async (lightSetName, level) => {
    // Retrieve the lights configuration and find the channel numbers for the given light set
    const lightsConfig = get(lights);
    const channels = lightsConfig[lightSetName];

    // If no channels are found for the given light set, log an error and return early
    if (!channels) {
        console.error(`No channels found for light set: ${lightSetName}`);
        return;
    }

    // Sort the channel numbers and create a unique key for caching purposes
    const sortedChannels = [...channels].sort();
    const channelKey = sortedChannels.join(',');

    // Prevent repeated calls with the same value
    if (lastSentValues[channelKey] === level) return;
    lastSentValues[channelKey] = level;

    // Build the XML command with the actual channel numbers
    const xmlCommands = sortedChannels.map(channelNumber => 
        `<set udn="${channelNumber}" space="1" level="${level}" side="both"/>`
    ).join('');
    const xmlCommand = `<setlevels>${xmlCommands}</setlevels>`;

    console.log('Sending XML command:', xmlCommand);
    return rateLimitedSendCommand(xmlCommand);
};

/**
 * Fetch light levels from all connected dimmer racks.
 * @returns {Promise<Object>} - A promise that resolves with an object where keys are channel UDNs and values are light levels.
 */
export const fetchLightLevels = async () => {
    const xmlCommand = `<setlevels><get udn="all"/></setlevels>`;
    try {
        const responses = await rateLimitedSendCommand(xmlCommand);
        const levels = await Promise.all(responses.map(async (res) => {
            const text = await res.text();
            console.log('Response Text:', text);
            
            // Convert XML to JSON
            const jsonData = xml2js(text, { compact: true, spaces: 2 });
            console.log('JSON Data:', jsonData);
            
            // Extract levels from JSON (you need to adjust this path according to your XML structure)
            const levelData = jsonData.html.information.info.map(info => ({
              udn: info._attributes.udn,
              level: info._attributes.level
            }));
            
            // Convert array to object
            const levelObject = {};
            levelData.forEach(item => {
              levelObject[item.udn] = item.level;
            });
            
            return levelObject;
        }));
        
        // Merge all level objects into one
        const allLevels = Object.assign({}, ...levels);
        return allLevels;
        
    } catch (error) {
        console.error('Failed to fetch light levels:', error);
        return {}; // Return a valid object in case of network errors
    }
};

/**
 * Get the average light level for a specific light set.
 * @param {string} lightSetName - The name of the light set.
 * @returns {Promise<number>} - A promise that resolves with the average light level of the channels in the light set.
 */
export const getLightLevel = async (lightSetName) => {
    const channels = getChannelNumbers(lightSetName);

    const allLevels = await fetchLightLevels();
    const relevantLevels = channels.map(channel => allLevels[channel]).filter(level => level !== undefined);
    console.log(allLevels, relevantLevels);

    if (relevantLevels.length === 0) {
        console.warn(`No light levels found for channels: ${channels.join(', ')}`);
        return 0;
    }

    const averageLevel = relevantLevels.reduce((sum, level) => sum + level, 0) / relevantLevels.length;
    return averageLevel;
};
