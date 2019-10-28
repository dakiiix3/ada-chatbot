import { LanguageService } from './shared/services/language-service';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { TestFairySDK } from "nativescript-testfairy";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    @ViewChild("lblMenuSettings", { static: false }) lblMenuSettings: ElementRef;

    constructor(private router: Router,
                private routerExtensions: RouterExtensions,
                private ls: LanguageService) {
        // Use the component constructor to inject services.
        TestFairySDK.setServerEndpoint("https://ada-chatbot.testfairy.com");
        TestFairySDK.begin("SDK-vSREcxmy");
        TestFairySDK.log("hallo welt aus nativescript!");
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        setTimeout(() => {
            this.lblMenuSettings.nativeElement.text= this.ls.translate("view.settings");
        }, 10);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
