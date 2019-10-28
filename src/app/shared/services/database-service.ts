import { Message } from './../model/message';
import { Observable } from 'rxjs';

var Sqlite = require("nativescript-sqlite");

export class DatabaseService {

    private databaseName = "ava.db";
    // private database: any;
    private sqlCreateTable = "create table if not exists messages (id integer primary key autoincrement, date text, message text, isright integer)";

    constructor() {
        // console.log('database service constructor');
        // this.createDatabase();
    }

    insert(message: Message): Observable<boolean> {
        return new Observable((observer) => {
            this.createDatabase().subscribe((database) => {
                if (database !== undefined || database !== null || database.isOpen()) {
                    this.insertMessage(database, message).then((res) => {
                        observer.next(res);
                        observer.complete();
                    });
                } else {
                    observer.next(false);
                    observer.complete();
                }
            });
        });
    }

    fetch(): Observable<Array<Message>> {
        return new Observable((observer) => {
            this.createDatabase().subscribe((database) => {
                console.log("database fetch", database, typeof(database));

                if (database !== undefined || database !== null || database.isOpen()) {
                    this.fetchMessages(database).then((res) => {
                        console.log("fetched messages", res);
                        observer.next(res);
                        observer.complete();
                    });
                } else {
                    observer.next([]);
                    observer.complete();
                }
            });
        });
    }

    deleteAll(): Observable<boolean> {
        return new Observable((observer) => {
            this.createDatabase().subscribe((database) => {
                if (database !== undefined || database !== null || database.isOpen()) {
                    this.deleteMessages(database).then((value) => {
                        console.log("deleteAll", value);
                        observer.next(value);
                        observer.complete();
                    });
                } else {
                    observer.next(false);
                    observer.complete();
                }
            });
        });
    }

    count(): Observable<number> {
        return new Observable((observer) => {
            this.createDatabase().subscribe((database) => {
                if (database !== undefined || database !== null || database.isOpen()) {
                    this.countMessages(database).then((value) => {
                        console.log("count value", value);
                        observer.next(value);
                        observer.complete();
                    });
                } else {
                    observer.next(0);
                    observer.complete();
                }
            });
        });
    }

    private insertMessage(database: any, message: Message): Promise<boolean> {
        return database.execSQL("INSERT INTO messages (date, message, isright) VALUES (?, ?, ?)",
            [message.date, message.text, message.isRight]).then((id) => {
            console.log("insert result", id, message.text);
            // this.fetch();
            return true;
        }, (error) => {
            console.log("insert error", error);

            return false;
        });
    }

    private fetchMessages(database: any): Promise<Array<Message>> {
        return database.all("select * from messages").then((rows) => {
            const messages = [];
            console.log("rows", rows);
            for (let row in rows) {
                messages.push(new Message(rows[row][1], rows[row][2], rows[row][3]));
            }

            return messages;
        }, (error) => {
            console.log("select error", error);

            return [];
        });
    }

    private deleteMessages(database: any): Promise<boolean> {
        return database.execSQL("delete from messages").then((id) => {
            return true;
        }, (error) => {
            console.log("error delete messages", error);

            return false;
        });
    }

    private countMessages(database: any): Promise<number> {
        return database.get("select count(id) from messages").then((id) => {
            console.log("count", id);

            return id;
        }, (error) => {
            console.log("error count messages", error);

            return 0;
        });
    }

    private createDatabase(): Observable<any> {
        return new Observable((observer) => {
            let database: any;

            (new Sqlite(this.databaseName)).then((db) => {
                db.execSQL(this.sqlCreateTable).then((id) => {
                    database = db;
                    console.log("create table complete");

                    observer.next(database);
                    observer.complete();
                }, (error) => {
                    console.log("error create table", error);
                    observer.complete();
                });
            }, (error) => {
                console.log("error opening db", error);
                observer.complete();
            });
        });
    }

}
