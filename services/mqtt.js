const mqtt = require('mqtt');

export default class MqttService {
    constructor(RASP_IP, CLIENT_ID){
        var client = this.connectToChannel(RASP_IP, CLIENT_ID);
    };

    

    async connectToChannel(raspIp, clientId){
        try {
            var mqtt_client = mqtt.connect("mqtt://"+raspIp, {clientId: clientId});
            return {connected: 1, status: "Connected", client: mqtt_client}
        }
        catch{
            return {connected: 0, status: 'Failed to connect to mqtt broker'}
        }
    }



};