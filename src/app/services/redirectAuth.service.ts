import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import * as _ from 'lodash';
import { StateService } from './state.service';

@Injectable()

export class RedirectAuthService implements CanActivate{
    constructor(private storage: LocalStorageService,
        private stateService: StateService){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(_.isEmpty(this.storage.get('userInfo'))){
            return true;
        }
        this.stateService.go('feed')
        return false;
    }
}