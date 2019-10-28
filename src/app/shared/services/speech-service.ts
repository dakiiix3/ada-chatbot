import { LanguageService } from "./language-service";
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";

export class SpeechService {

    private tts: any;

    constructor(private languageService: LanguageService) {
        this.tts = new TNSTextToSpeech();
        console.log('speech service called');
    }

    speak(message: string): void {
        console.log("code language service", this.languageService.code);
        const locale = (this.languageService.code === "deutsch"
            || this.languageService.code === "german") ? "de-de" : "en-gb";
            console.log("locale", locale);

        const speakOptions: SpeakOptions = {
            text: message, /// *** required ***
            // speakRate: 0.5, // optional - default is 1.0
            // pitch: 1.0, // optional - default is 1.0
            // volume: 1.0, // optional - default is 1.0
            locale // optional - default is system locale,
            // finishedCallback: Function // optional
          };

        this.tts.speak(speakOptions).then(
            () => {
                console.log("Die Ausgabe war erfolgreich");
            }, (err) => {
                console.log("Es ist ein Fehler aufgetreten.");
            }
        );
    }

}
