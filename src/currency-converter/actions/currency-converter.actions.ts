import { Action } from "@ngrx/store";

export enum CURRENCY_ACTION_TYPES {
  CHANGE_FROM_CURRENCY = "Change the Base currency",
  CHANGE_TO_CURRENCY = "Change the To currency",
  UPDATE_EXCHANGE_RATES = "Update the exchanage rates",
  ADD_HISTORY_RECORD = "Add a record to history data list",
  DELETE_HISTORY_RECORD = "Delete a record from history list"
}

export class ChangeFromCurrency implements Action {
  readonly type = CURRENCY_ACTION_TYPES.CHANGE_FROM_CURRENCY;
  constructor(public payload: string) {}
}
export class ChangeToCurrency implements Action {
  readonly type = CURRENCY_ACTION_TYPES.CHANGE_TO_CURRENCY;
  constructor(public payload: string) {}
}
export class UpdateExchangeRates implements Action {
  readonly type = CURRENCY_ACTION_TYPES.UPDATE_EXCHANGE_RATES;
  constructor(public payload: { [key: string]: number }) {}
}
export class AddHistoryRecord implements Action {
  readonly type = CURRENCY_ACTION_TYPES.ADD_HISTORY_RECORD;
  constructor(public payload: { from: string; to: string; date: Date }) {}
}
export class DeleteHistoryRecord implements Action {
  readonly type = CURRENCY_ACTION_TYPES.DELETE_HISTORY_RECORD;
  constructor(public payload: string) {}
}
export type CurrencyConverterActionsUnion =
  | ChangeFromCurrency
  | ChangeToCurrency
  | UpdateExchangeRates
  | AddHistoryRecord
  | DeleteHistoryRecord;
