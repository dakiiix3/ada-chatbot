import { StorageService } from "./storage-service";
import { Injectable } from "@angular/core";
import { de, en } from "../messages/messages";

@Injectable()
export class LanguageService {

    private _code: string = "de-de";
    // private values: { [ key:string ]: string; } = {};

    constructor(private storageService: StorageService) {
        // Laden der Daten und Speichern in Array
        // this.loadMessages();
        const code = this.storageService.getString("language");
        this._code = (code === undefined || code === null) ? "de-de" : code;
    }

    translate(key: string): string {
        const val = this.value(key);

        return val;
    }

    changeLanguage(code: string): void {
        this._code = code;
    }

    getLanguageCode(language: string): string {
        let code = "";
        switch (language) {
            case this.value("languages.english"):
                code = "en-gb";
                break;
            default:
                code = "de-de";
        }

        return code;
    }

    getLanguage(code: string): string {
        if (code === "en-gb") {
            return this.value("languages.english");
        }

        return this.value("languages.german");
    }

    get code(): string {
        return this._code;
    }

    private value(key: string): any {
        let value = (this._code === "de-de") ? de : en;

        if (key.split(".").length > 0) {
            key.split(".").forEach((e) => {
                value = value[e];
            });

            return value;
        }

        return value[key];
    }

}
