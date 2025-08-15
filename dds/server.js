const WebSocket = require('ws');
const rti = require('rticonnextdds-connector');
const path = require('path');

const XML_CONFIG = path.join(__dirname, 'MyDDS.xml');
const PARTICIPANT = 'MyParticipantLibrary::MySubParticipant';
const PUBLISHER = 'MyPublisher::MyWriter';

const wss = new WebSocket.Server({ port: 3001, host: '0.0.0.0' });
console.log('WebSocket server running on ws://192.168.3.248:3001');

const connector = new rti.Connector(PARTICIPANT, XML_CONFIG);
const output = connector.getOutput(PUBLISHER);

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            console.log('Received from Laravel:', data);

            output.instance.setString('nama', data.nama);
            await output.write();

            console.log(`DDS Published: ${data.nama}`);
        } catch (err) {
            console.error('Error publishing to DDS:', err);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
