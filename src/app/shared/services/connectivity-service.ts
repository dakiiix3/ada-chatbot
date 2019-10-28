import { connectionType, getConnectionType, startMonitoring, stopMonitoring } from "tns-core-modules/connectivity";

export class ConnectivityService {

    constructor() {
        // constructor
    }

    isConnected(): boolean {
        const connection = getConnectionType();

        return connection === connectionType.mobile ||
            connection === connectionType.wifi;
    }

}
