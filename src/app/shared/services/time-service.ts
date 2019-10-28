import * as moment from "moment";

export class TimeService {

    currentTime(): string {
        const date = moment().format('DD.MM.YYYY HH:mm');
        return date;
    }

}
