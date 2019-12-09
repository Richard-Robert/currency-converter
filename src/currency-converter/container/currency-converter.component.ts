import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { CurrencyConverterService } from "../services/currency-converter.service";
import { Store } from "@ngrx/store";
import { CurrencyConverterState, currencyConverterState } from "../store/index";
import {
  ChangeFromCurrency,
  ChangeToCurrency,
  AddHistoryRecord,
  DeleteHistoryRecord
} from "../actions/currency-converter.actions";
import { Observable } from "rxjs";
import { HistoryRecord } from "../models/currency-converter.models";
import { HistoryRecordState } from "../entities/conversion-history.entity";

@Component({
  selector: "app-currency-converter",
  templateUrl: "./currency-converter.component.html",
  styleUrls: ["./currency-converter.component.scss"]
})
export class CurrencyConverterComponent implements OnInit {
  activatedRoute = "";
  baseCurrency = "";
  toCurrency = "";
  exchangeRate: number;
  exchangeRates;
  history$: Observable<any> | HistoryRecord[];
  constructor(
    private route: ActivatedRoute,
    private currencyConverterService: CurrencyConverterService,
    private store: Store<CurrencyConverterState>
  ) {
    this.activatedRoute = this.route.snapshot.routeConfig.path;
  }

  ngOnInit() {
    this.store
      .select(currencyConverterState)
      .subscribe((state: CurrencyConverterState) => {
        this.baseCurrency = state.fromCurrency;
        this.toCurrency = state.toCurrency;
        this.exchangeRate = state.exchangeRates[this.toCurrency];
        if (!this.exchangeRate) {
          this.store.dispatch(new ChangeFromCurrency(this.baseCurrency));
        }
      });
    this.history$ = this.store.select(currencyConverterState).pipe(
      map(state => state.history),
      map((val: any) => {
        console.log(val);
        return Object.values(val.entities);
      })
    );
    // .subscribe(historyObject => {
    //   this.history$ = Object.values(historyObject);
    //   console.log(this.history$);
    // });
  }

  updateCurrency(event: { base: string; to: string }) {
    // console.log(event.base);
    if (this.baseCurrency !== event.base) {
      this.store.dispatch(new ChangeFromCurrency(event.base));
    } else {
      this.store.dispatch(new ChangeToCurrency(event.to));
      this.exchangeRate = this.exchangeRates[event.to];
    }
  }
  addHistoryRecord(event: { from: string; to: string }) {
    this.store.dispatch(
      new AddHistoryRecord({
        ...event,
        date: new Date()
      })
    );
  }
  removeHistoryRecord(id: string) {
    this.store.dispatch(new DeleteHistoryRecord(id));
  }
}
