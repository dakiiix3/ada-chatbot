import { MessageService } from './shared/services/message-service';
import { DatabaseService } from './shared/services/database-service';
import { SpeechRecognitionService } from './shared/services/speech-recognition-service';
import { ConnectivityService } from './shared/services/connectivity-service';
import { StorageService } from './shared/services/storage-service';
import { SpeechService } from './shared/services/speech-service';
import { TimeService } from './shared/services/time-service';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptLocalizeModule,
        NativeScriptUISideDrawerModule,
        SharedModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
    ],
    exports: [
        NativeScriptLocalizeModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
