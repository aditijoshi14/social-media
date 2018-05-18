import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class StateService{
    constructor(private route: Router, 
        private activatedRouter: ActivatedRoute){

    }

    go(stateName): void{
        this.route.navigate([stateName]);
    }
}