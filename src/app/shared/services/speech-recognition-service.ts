import { SpeechRecognition, SpeechRecognitionTranscription } from "nativescript-speech-recognition";

export class SpeechRecognitionService {

    private speechRecognition = new SpeechRecognition();
    private _text: string;

    constructor() {
        // constructor
    }

    startRecognition(): void {
        this.speechRecognition.startListening(
            {
              // optional, uses the device locale by default
              locale: "de-de",
              // set to true to get results back continuously
              returnPartialResults: true,
              // this callback will be invoked repeatedly during recognition
              onResult: (transcription: SpeechRecognitionTranscription) => {
                console.log(`User said: ${transcription.text}`);
                console.log(`User finished?: ${transcription.finished}`);
                this._text = transcription.text;
              },
              onError: (error: string | number) => {
                // because of the way iOS and Android differ, this is either:
                // - iOS: A 'string', describing the issue.
                // - Android: A 'number', referencing an 'ERROR_*' constant from https://developer.android.com/reference/android/speech/SpeechRecognizer.
                //            If that code is either 6 or 7 you may want to restart listening.
              }
            }
          ).then(
            (started: boolean) => { console.log(`started listening`) },
            (errorMessage: string) => { console.log(`Error: ${errorMessage}`); }
          ).catch((error: string | number) => {
            // same as the 'onError' handler, but this may not return if the error occurs after listening has successfully started (because that resolves the promise,
            // hence the' onError' handler was created.
          });
    }

    endRecognition(): void {
        this.speechRecognition.stopListening().then(
            () => { console.log(`stopped listening`); },
            (errorMessage: string) => { console.log(`Stop error: ${errorMessage}`); }
        );
    }

    get text(): string {
        return this._text;
    }

}
