import { LanguageService } from "./../shared/services/language-service";
import { DatabaseService } from "./../shared/services/database-service";
import { StorageService } from "./../shared/services/storage-service";
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Color } from "tns-core-modules/color/color";
import { EventData } from "tns-core-modules/ui/page/page";
import { ListPicker } from "tns-core-modules/ui/list-picker";

import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { TranslationService } from "../shared/services/translation-service";
import { lang } from "moment";

@Component({
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit, AfterViewInit {

    @ViewChild("speech", { static: false }) speech: ElementRef;
    @ViewChild("count", { static: false }) countMessages: ElementRef;
    @ViewChild("language", { static: false }) language: ElementRef;
    @ViewChild("lblVoice", { static: false }) lblVoice: ElementRef;
    @ViewChild("lblCount", { static: false }) lblCount: ElementRef;
    @ViewChild("lblLanguage", { static: false }) lblLanguage: ElementRef;
    @ViewChild("btnDelete", { static: false }) btnDelete: ElementRef;
    @ViewChild("btnSettings", { static: false }) btnSettings: ElementRef;
    @ViewChild("lblSettingsBar", { static: false }) lblSettingsBar: ElementRef;

    languages: Array<string> = [];

    private feedback: Feedback;
    private keyLanguage: string = "language";
    private keyVoice: string = "voice";

    constructor(
        private storageService: StorageService,
        private databaseService: DatabaseService,
        private ts: TranslationService,
        private ls: LanguageService) {
        // Use the component constructor to inject providers.
        this.feedback = new Feedback();
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    ngAfterViewInit(): void {
        this.initCountMessages();
        this.initLanguages();
        this.initVoiceValue();
        this.initLanguageValue();

        // initialiseren der Texte
        this.initText();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    saveSettings(): void {
        // Speichern der Settings in lokalem Storage mittels App-Settings
        // erst löschen
        // anschliessend speichern
        const code = this.ls.getLanguageCode(this.languageValue);
        
        this.storageService.storeValue(this.keyLanguage, code);
        this.storageService.storeValue(this.keyVoice, this.voiceValue);
        // Sprache ändern
        this.ls.changeLanguage(code);
        this.initLanguages();
        this.initText();
        this.initLanguageValue();
    }

    onSelectedIndexChanged(args: EventData) {
        const picker = <ListPicker>args.object;
        console.log(`index: ${picker.selectedIndex}`);
    }

    changeLanguage() {
        dialogs.action({
            message: this.ls.translate("settings.select-language"),
            cancelButtonText: this.ls.translate("general.cancel"),
            actions: this.languages
        }).then((result) => {
            console.log("change language", result);
            if (result !== this.ls.translate("general.cancel")) {
                this.language.nativeElement.text = result;
            }
        });
    }

    confirmDelete(): void {
        dialogs.confirm({
            title: this.ls.translate("settings.confirm-delete"),
            message: this.ls.translate("settings.question-delete"),
            okButtonText: this.ls.translate("general.ok"),
            cancelButtonText: this.ls.translate("general.cancel")
        }).then((result: boolean) => {
            if (result) {
                this.deleteAllData();
            }
        });
    }

    private deleteAllData(): void {
        this.databaseService.deleteAll().subscribe((res) => {
            console.log("successful", res);

            if (res) {
                this.initCountMessages();
                this.feedback.show({
                    position: FeedbackPosition.Bottom, // iOS only
                    type: FeedbackType.Success, // this is the default type, by the way
                    message: this.ls.translate("settings.success-delete"),
                    messageColor: new Color("white"),
                    duration: 3000,
                    backgroundColor: new Color("yellowgreen")
                });
            } else {
                this.feedback.show({
                    position: FeedbackPosition.Bottom, // iOS only
                    type: FeedbackType.Error, // this is the default type, by the way
                    message: this.ls.translate("settings.error-delete"),
                    messageColor: new Color("white"),
                    duration: 3000,
                    backgroundColor: new Color("red")
                });
            }
        });
    }

    private initCountMessages() {
        this.databaseService.count().subscribe((value) => {
            this.countMessages.nativeElement.text = value;
        });
    }

    private get languageValue(): string {
        return this.language.nativeElement.text;
    }

    private get voiceValue(): boolean {
        return this.speech.nativeElement.checked;
    }

    private initLanguageValue() {
        const code: string = this.storageService.getString(this.keyLanguage);
        const language = this.ls.getLanguage(code);
        console.log("language", code, language);
        this.language.nativeElement.text = language;
    }

    private initVoiceValue() {
        const value: boolean = this.storageService.getBoolean(this.keyVoice);
        console.log("speech", value);
        this.speech.nativeElement.checked = (value === undefined) ? false : true;
    }

    private initText() {
        this.lblSettingsBar.nativeElement.text = this.ls.translate("view.settings");
        this.lblVoice.nativeElement.text = this.ls.translate("settings.voice");
        this.lblCount.nativeElement.text = this.ls.translate("settings.messages");
        this.lblLanguage.nativeElement.text = this.ls.translate("settings.language");
        this.btnDelete.nativeElement.text = this.ls.translate("settings.delete-data");
        this.btnSettings.nativeElement.text = this.ls.translate("settings.save");
    }

    private initLanguages() {
        this.languages = [
            this.ls.translate("languages.german"),
            this.ls.translate("languages.english") ];
    }
}
