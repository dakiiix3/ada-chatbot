import { Injectable } from '@angular/core';
import { environment} from '../shared/model/environments'
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'
import { BehaviorSubject } from 'rxjs';

  export class Message {
    constructor( public content: string, public sentBy: string) {
 
    }
  }

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly token = environment.dialogflow.chatbot;
  readonly client = new ApiAiClient({accessToken: this.token});

  conservation = new BehaviorSubject<Message[]>([]);

  constructor() { }

  update(msg: Message) {
    this.conservation.next([msg]);
  }

  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg).then(res => {

     const speech = res.result.fulfillment.speech;
     const botMessage = new Message(speech, 'bot');    
     this.update(botMessage);
    });
  }

  testFunc() {
    this.client.textRequest('Gib mir Prozessanweisungen').then(res => {
      console.log(res); // Gibt in der Console die ANfrage und die Antwort des Chatbots aus
    })
  }
}
