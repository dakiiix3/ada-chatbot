import * as appSettings from "tns-core-modules/application-settings";

export class StorageService {

    constructor() {
        // constructor
    }

    storeValue(key: any, value: any): void {
        appSettings.remove(key);

        switch (typeof(value)) {
            case "boolean":
                appSettings.setBoolean(key, value);
                break;
            case "string":
                appSettings.setString(key, value);
                break;
            case "number":
                appSettings.setNumber(key, value);
                break;
            default:
                console.log("typ unbekannt:", typeof(value));
        }
    }

    containsKey(key: string): boolean {
        return appSettings.hasKey(key);
    }

    getString(key: string): string {
        return appSettings.getString(key);
    }

    getNumber(key: string): number {
        return appSettings.getNumber(key);
    }

    getBoolean(key: string): boolean {
        return appSettings.getBoolean(key);
    }

}
