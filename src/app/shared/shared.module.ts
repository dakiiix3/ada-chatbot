import { LanguageService } from './services/language-service';
import { StorageService } from './services/storage-service';
import { TranslationService } from './services/translation-service';
import { TimeService } from './services/time-service';
import { SpeechService } from './services/speech-service';
import { MessageService } from './services/message-service';
import { DatabaseService } from './services/database-service';
import { ConnectivityService } from './services/connectivity-service';
import { LanguagePipe } from './pipes/language.pipe';
import { NgModule } from '@angular/core';
import { SpeechRecognitionService } from './services/speech-recognition-service';

@NgModule({
  declarations: [
      LanguagePipe
  ],
  imports: [  ],
  providers: [
      ConnectivityService,
      DatabaseService,
      MessageService,
      SpeechRecognitionService,
      SpeechService,
      TimeService,
      TranslationService,
      StorageService,
      LanguageService
  ],
  exports: [
      LanguagePipe
  ]
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [
                { provide: ConnectivityService },
                { provide: DatabaseService },
                { provide: MessageService },
                { provide: SpeechRecognitionService },
                { provide: SpeechService },
                { provide: TimeService },
                { provide: TranslationService },
                { provide: StorageService },
                { provide: LanguageService }
            ]
        };
    }
 }
