import { Component, OnDestroy } from '@angular/core';
import { AppState } from '../../app-state';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { INCREMENT, DECREMENT, RESET } from '../../counter';

import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-router-child',
  templateUrl: './router-child.component.html',
  styleUrls: ['./router-child.component.css']
})
export class RouterChildComponent implements OnDestroy {

    counter: Observable<number>;
    count : number;
    subscription : ISubscription;

    constructor(private store: Store<AppState>) {
        
        this.counter = store.select('counter');
        
        this.subscription = this.counter.subscribe(e => this.count = e); // 구독

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    /* 증가 */
    increment(){
        this.store.dispatch({ type: INCREMENT });
    }
    
    /* 감소 */
    decrement(){
        this.store.dispatch({ type: DECREMENT });
    }
    
    /* 초기화 */
    reset(){
        this.store.dispatch({ type: RESET });
    }

}
