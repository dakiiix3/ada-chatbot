import { Injectable } from '@angular/core';
import { environment} from '../model/environments'
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'
import { BehaviorSubject } from 'rxjs';
import { resetSymbol } from 'tns-core-modules/ui/text-base/text-base';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  readonly token = environment.dialogflow.chatbot;
  readonly client = new ApiAiClient({accessToken: this.token, lang: "de"});

  constructor() { }

  communicate(message: string) {
    return this.client.textRequest(message);
  }
}
