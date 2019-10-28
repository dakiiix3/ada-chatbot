import { localize } from "nativescript-localize";
import { overrideLocale } from "nativescript-localize/localize";
let application = require("application");

export class TranslationService {

    public translate(text: string): string {
        return localize(text);
    }

    public changeLanguage(language: string): any {
        const value = this.getValue(language);
        console.log(language, " - ", value);

        const success = overrideLocale(value);
        // ToDo: change language with native: https://stackoverflow.com/questions/12908289/how-to-change-language-of-app-when-user-selects-language
        return success;
    }

    private getValue(key: string): string {
        switch (key) {
            case this.translate("languages.english"):
                return "en-gb";
            case this.translate("languages.french"):
                return "fr";
            default:
                return "de-de";
        }
    }

}
