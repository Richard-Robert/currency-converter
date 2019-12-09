import {
  Component,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  Input,
  SimpleChanges
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { HistoryRecord } from "src/currency-converter/models/currency-converter.models";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-conversion",
  templateUrl: "./conversion.component.html",
  styleUrls: ["./conversion.component.scss"]
})
export class ConversionComponent implements OnInit, OnChanges {
  @Input() baseCurrency: string;
  @Input() toCurrency: string;
  @Input() exchangeRate: string;
  @Input() history$: Observable<HistoryRecord[]> | HistoryRecord[];
  @Output() changeCurrency$: EventEmitter<{ base: string; to: string }>;
  @Output() addHistoryRecord$: EventEmitter<{ from: string; to: string }>;
  @Output() removeHistoryRecord$: EventEmitter<string>;
  conversionForm: FormGroup;

  currencyList: string[] = ["CAD", "USD", "EUR"];

  constructor(private formBuilder: FormBuilder) {
    this.changeCurrency$ = new EventEmitter();
    this.addHistoryRecord$ = new EventEmitter();
    this.removeHistoryRecord$ = new EventEmitter();
    this.conversionForm = this.formBuilder.group({
      fromCurrency: ["", Validators.required],
      toCurrency: ["", Validators.required],
      fromCurrencyValue: ["", Validators.required],
      toCurrencyValue: [{ value: "", disabled: true }]
    });
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    // this.conversionForm.get('fromCurrency').valueChanges.subscribe(val => {
    //   console.log('whyy');
    //   this.submitForm(
    //     this.conversionForm.get('fromCurrency').value,
    //     this.conversionForm.get('toCurrency').value
    //   );
    // });
    if (changes.baseCurrency) {
      this.conversionForm.get("fromCurrency").setValue(this.baseCurrency);
    }
    if (changes.toCurrency) {
      this.conversionForm.get("toCurrency").setValue(this.toCurrency);
    }
    // if (changes.history$) {
    //   console.log(this.history$);
    //   this.history$
    //     .pipe(
    //       map((val: any) => {
    //         console.log(val);
    //         return val.entities;
    //       }),
    //       switchMap(val => {
    //         console.log(Object.values(val));
    //         return Object.values(val);
    //       })
    //     )
    //     .subscribe(val => console.log(val));
    // }
  }
  changeBaseCurrency() {
    this.baseCurrency = this.conversionForm.get("fromCurrency").value;
    this.emitCurrencyChange();
  }
  changeToCurrency() {
    this.toCurrency = this.conversionForm.get("toCurrency").value;
    this.emitCurrencyChange();
  }
  emitCurrencyChange() {
    this.changeCurrency$.emit({
      base: this.baseCurrency,
      to: this.toCurrency
    });
  }
  submitForm() {
    if (this.conversionForm.valid) {
      if (this.baseCurrency !== this.toCurrency) {
        this.conversionForm
          .get("toCurrencyValue")
          .setValue(
            this.conversionForm.get("fromCurrencyValue").value *
              parseFloat(this.exchangeRate)
          );
        this.addHistoryRecord$.emit({
          from: `${this.baseCurrency}: ${
            this.conversionForm.get("fromCurrencyValue").value
          }`,
          to: `${this.toCurrency}: ${
            this.conversionForm.get("toCurrencyValue").value
          }`
        });
      } else {
        alert("From and To currency cannot be the same");
      }
    }
  }
  deleteRecord(historyRecord) {
    console.log(`Delete ${historyRecord.id} element`);
    this.removeHistoryRecord$.emit(historyRecord.id);
  }
}
