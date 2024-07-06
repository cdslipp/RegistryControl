// backend/server.js
import express from 'express';
import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

const app = express();
app.use(express.json());

const DIMMER_RACKS = ['192.168.0.3', '192.168.0.4', '192.168.0.5']; // Example IPs

let lastCallTimestamp = 0;
let lastSentValues = {};
const minDelayBetweenCalls = 100; // Adjust as needed

const sendCommand = async (xmlCommand) => {
	const promises = DIMMER_RACKS.map((ip) =>
		fetch(`http://${ip}/goform/dimmertest`, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/xml'
			},
			body: xmlCommand
		})
	);
	const responses = await Promise.all(promises);
	return responses;
};

const rateLimitedSendCommand = async (xmlCommand) => {
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

app.post('/lights/getLevels', async (req, res) => {
	const { lightSetName } = req.body;
	const xmlCommand = `<setlevels><get udn="all"/></setlevels>`;
	try {
		const responses = await rateLimitedSendCommand(xmlCommand);
		const levels = await Promise.all(
			responses.map(async (res) => {
				const text = await res.text();
				const jsonData = await parseStringPromise(text, { compact: true, spaces: 2 });
				const levelData = jsonData.html.information.info.map((info) => ({
					udn: info._attributes.udn,
					level: info._attributes.level
				}));
				const levelObject = {};
				levelData.forEach((item) => {
					levelObject[item.udn] = item.level;
				});
				return levelObject;
			})
		);
		const allLevels = Object.assign({}, ...levels);
		const channels = getChannelNumbers(lightSetName);
		const relevantLevels = channels
			.map((channel) => allLevels[channel])
			.filter((level) => level !== undefined);
		const averageLevel =
			relevantLevels.reduce((sum, level) => sum + level, 0) / relevantLevels.length;
		res.json({ averageLevel });
	} catch (error) {
		console.error('Failed to fetch light levels:', error);
		res.status(500).json({ error: 'Failed to fetch light levels' });
	}
});

app.post('/lights/setLevels', async (req, res) => {
	const { channels, level } = req.body;
	const sortedChannels = [...channels].sort();
	const channelKey = sortedChannels.join(',');

	if (lastSentValues[channelKey] === level) {
		return res.json({ status: 'No change' });
	}
	lastSentValues[channelKey] = level;

	const xmlCommands = sortedChannels
		.map((channelNumber) => `<set udn="${channelNumber}" space="1" level="${level}" side="both"/>`)
		.join('');
	const xmlCommand = `<setlevels>${xmlCommands}</setlevels>`;

	try {
		await rateLimitedSendCommand(xmlCommand);
		res.json({ status: 'Success' });
	} catch (error) {
		console.error('Error setting light levels:', error);
		res.status(500).json({ error: 'Failed to set light levels' });
	}
});

const getChannelNumbers = (lightSetName) => {
	const lightsConfig = {
		house: [72],
		front: [25, 26, 27, 21, 20, 19],
		sides: [31, 37, 8, 2, 9, 3],
		tops: [7, 13, 1, 14, 15, 16]
	};
	return lightsConfig[lightSetName] || null;
};

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});
