import { DatabaseService } from './database-service';
import { Observable } from 'rxjs';
import { Message } from '../model/message';

export class MessageService {

    constructor(
        private databaseService: DatabaseService) {
    }

    dropAllMessages(): Observable<boolean> {
        return this.databaseService.deleteAll();
    }

    addMessage(message: Message): Observable<boolean> {
        return this.databaseService.insert(message);
    }

    getAllMessages(): Observable<Array<Message>> {
        return this.databaseService.fetch();
    }

}
