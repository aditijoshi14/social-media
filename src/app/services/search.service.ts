import { Injectable} from '@angular/core';
import { SearchUser } from '../app.interface';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant';
import { Observable, Subject, ReplaySubject, from, of, range, interval, timer, Subscription } from 'rxjs';

@Injectable()
export class SearchService {
    private searchList: Array<any>;
    searchActive: boolean;
    private searchInput: string;
    private noMatch: boolean;
    private debounceTimer: any;
    private debounceSubscription: Subscription; 

    constructor(private httpClient: HttpClient) {
        this.searchList = [];
        this.searchActive = false;
        this.searchInput = "";
        this.noMatch = false;

    }

    getList() {
        if(this.debounceSubscription !== undefined) {
            this.debounceSubscription.unsubscribe();
        }
        this.debounceTimer = timer(500);
        this.debounceSubscription = this.debounceTimer.subscribe(() => {
            this.loadSearchList();
        });
    }

    loadSearchList(): void {
        if (this.searchInput.length > 0) {
            this.searchActive = true;
            this.httpClient.get(`${Constants.BASE_URL}/members_info/?fullName_like=${this.searchInput}`).subscribe(
                (data: any) => {
                    this.searchList = data;
                    if (this.searchList.length == 0) {
                        this.noMatch = true;
                    } else {
                        this.noMatch = false;
                    }
                }
            )
        } else {
            this.clear();
        }
    }

    clear() {
        this.searchActive = false;
        this.searchInput = "";
        this.noMatch = false;
    }

}