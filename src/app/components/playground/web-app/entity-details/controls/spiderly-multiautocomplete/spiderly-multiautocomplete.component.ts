import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { BaseAutocompleteControl } from '../base-autocomplete-control';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequiredComponent } from '../../required/required.component';

import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'spiderly-multiautocomplete',
    templateUrl: './spiderly-multiautocomplete.component.html',
    styles: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        TooltipModule,
        CommonModule,
        RequiredComponent,
        AutoCompleteModule,
    ]
})
export class SpiderlyMultiAutocompleteComponent extends BaseAutocompleteControl implements OnInit {
    // @Input() required: boolean = true; // TODO FT: delete if you don't need through whole app
    
    constructor(
        @Inject(PLATFORM_ID) protected override platformId: Object
    ) {
        super(platformId);
    }

    override ngOnInit(){
        super.ngOnInit();
    }

    search(event: AutoCompleteCompleteEvent){
        this.onTextInput.next(event);
    }

}
