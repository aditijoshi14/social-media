import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AuthInfoService {
    info: any;
    constructor(private storage: LocalStorageService){
        this.info = this.storage.get('userInfo');
    }

    setInfo(){
        this.info = this.storage.get('userInfo');
    }

    clear(){
        this.info = {};
    }
}