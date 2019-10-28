import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
// import 'rxjs/add/operator/scan'
// import { Observable } from 'tns-core-modules/ui/page/page';
// import { Observable} from 'rxjs/Observable'


@Component({
  selector: 'ns-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue:string;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    //this.chat.testFunc();
    //this.messages = this.chat.conservation.asObservable().pipe(
          // scan((acc, value) => acc.concat(value))
          // );
  }

  //button-click handler: Nachricht-Senden Event
  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }
}
