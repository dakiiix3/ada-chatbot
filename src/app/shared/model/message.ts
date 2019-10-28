
export class Message {

    constructor(
        private _date: string,
        private _text: string,
        private _isright: boolean) {
    }

    get date(): string {
        return this._date;
    }

    get text(): string {
        return this._text;
    }

    get isRight(): boolean {
        return this._isright;
    }

}
