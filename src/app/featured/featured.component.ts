import { LanguageService } from "./../shared/services/language-service";
import { MessageService } from "./../shared/services/message-service";
import { Message } from "./../shared/model/message";
import { ConnectivityService } from "./../shared/services/connectivity-service";
import { SpeechRecognitionService } from "./../shared/services/speech-recognition-service";
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { SpeechService } from "../shared/services/speech-service";
import { TimeService } from "../shared/services/time-service";
import * as Toast from "nativescript-toast";
import { DialogflowService} from "../shared/services/dialogflow.service";

@Component({
    selector: "Featured",
    moduleId: module.id,
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit, AfterViewInit {

    LISTENING = "listening";
    NOT_LISTENING = "not listening";

    listening: string = this.NOT_LISTENING;

    messages: Array<Message> = [];
    message: Message = new Message("", "", false);
    keyBoardTapped = false;

    @ViewChild("inputmessage", { static: false }) inputmessage: ElementRef;
    @ViewChild("scrollView", { static: false }) scrollView: ElementRef;
    @ViewChild("listView", { static: false }) listView: ElementRef;

    constructor(
        private speechService: SpeechService,
        private recognition: SpeechRecognitionService,
        private timeService: TimeService,
        private connectivityService: ConnectivityService,
        private messageService: MessageService,
        private dialogflowService: DialogflowService,
        private ls: LanguageService
        ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    ngAfterViewInit(): void {
        this.messageService.getAllMessages().subscribe((res) => {
            this.messages = res;
            this.messages.forEach((element) => {
                console.log(`${element.isRight} - ${element.text}`);
            });
            
            console.log("laenge", this.messages.length);
            if (this.messages.length === 0) {
                console.log("messages.welcome", this.ls.translate("messages.welcome"));
                this.addMessage(false, this.ls.translate("messages.welcome"));
            }
            this.handleConnectivity();
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    handleRecognition() {
        console.log("handle recognition", this.listening);
        if (this.listening === this.LISTENING) {
            this.stopRecognition();
        } else {
            this.startRecognition();
        }
    }

    startRecognition(): void {
        console.log("start");
        this.recognition.startRecognition();
        this.listening = this.LISTENING;
    }

    stopRecognition(): void {
        console.log("stop");
        this.recognition.endRecognition();
        this.listening = this.NOT_LISTENING;
        console.log("recognition text", this.recognition.text);
        this.inputmessage.nativeElement.text = this.recognition.text;
    }

    onKeyboardTap(): void {
        // Auslesen des TextFields
        const text = this.inputmessage.nativeElement.text;
        // hinzufuegen einer neuen Nachricht zu dem Array
        this.addMessage(true, text);
        // leeren des Eingabefeldes
        this.inputmessage.nativeElement.text = "";
        // Frage beantworten

        console.log("ausgabe.");
        setTimeout(() => {
            this.handleAnswer();
            // Toast fuer neue Nachricht anzeigen
            const toast = Toast.makeText(this.ls.translate("messages.new"));
            toast.show();
        }, 50);
    }

    handleAnswer() {
        // Filtern nach der letzten Frage
        const questions = this.messages.filter((e) => {
            return e.isRight;
        });
        // Letzte Frage wurde ermittelt
        const lastQuestion = questions[questions.length - 1];
        console.log("LASTQUEST: " + lastQuestion);
        this.dialogflowService.communicate(lastQuestion.text).then((res) => {
            console.log(lastQuestion.text + " in handle antwort:");
            //console.log(res);
            const answer = res["result"]["fulfillment"]["speech"];
            console.log(answer);
            this.addMessage(false, answer);
        }, (error) => {
            console.log("error", error);
            this.addMessage(false, this.ls.translate("error.connection"));
        });
    }

    handleConnectivity() {
        console.log("connected", this.connectivityService.isConnected());
        if (!this.connectivityService.isConnected()) {
            // query last message and check if it's already connection error message
            const lastMessage: Message = this.messages[this.messages.length - 1];

            if (lastMessage.text !== this.ls.translate("error.connection")) {
                // connection error message isn't last message in messages
                this.addMessage(false, this.ls.translate("error.connection"));
            }
        }
    }

    focusTextField() {
        this.inputmessage.nativeElement.focus();
        console.log("focus text view");
    }

    playMessage(message: string) {
        console.log("code language service", this.ls.code);
        console.log("play", message);
        this.speechService.speak(`${message}`);
    }

    addMessage(right: boolean, text: string) {
        setTimeout(() => {
            const timestamp = this.timeService.currentTime();
            const message = new Message(timestamp, text, right);

            // Neue Nachricht dem Array hinzufuegen
            this.messages.push(message);

            this.messageService.addMessage(message).subscribe();

            this.scrollView.nativeElement.scrollToVerticalOffset(0, true);
        }, 50);

        const nativeListView = this.listView.nativeElement;
        nativeListView.scrollToIndex(nativeListView.items.length);
    }

    isRight(bool: any) {
        return bool === true || bool === "true";
    }

    inputLength(): number {
        if (this.inputmessage === null || this.inputmessage === undefined ||
            this.inputmessage.nativeElement === null || this.inputmessage.nativeElement === undefined) {
            return 0;
        } else {
            return this.inputmessage.nativeElement.text.length;
        }
    }

    callback(text: string) {
        console.log("callback", text);
    }
}
