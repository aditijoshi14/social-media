import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthInfoService } from './authInfo.service';

@Injectable()
export class StateService {
    constructor(private router: Router,
        private activatedRouter: ActivatedRoute,
        private authInfoService: AuthInfoService
    ) {
    }

    go(stateName: string): void {
        if (stateName.substring(0, 2) == 'u/' &&
            stateName.substring(2) == this.authInfoService.info.userId) {
            stateName = "profile"
        }
        this.router.navigate([stateName]);
    }
}