import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptLocalizeModule } from 'nativescript-localize/angular';

import { FeaturedRoutingModule } from "./featured-routing.module";
import { FeaturedComponent } from "./featured.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FeaturedRoutingModule,
        NativeScriptLocalizeModule,
        SharedModule
    ],
    declarations: [
        FeaturedComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FeaturedModule { }
