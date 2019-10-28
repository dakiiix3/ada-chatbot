import { LanguageService } from "./../services/language-service";
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: "language"})
export class LanguagePipe implements PipeTransform {

    constructor(private languageService: LanguageService) {

    }

    transform(key: string): string {
        return this.languageService.translate(key);
    }

}
