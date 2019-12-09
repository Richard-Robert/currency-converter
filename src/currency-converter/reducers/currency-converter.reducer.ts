import { Action } from "@ngrx/store";
import {
  CurrencyConverterActionsUnion,
  CURRENCY_ACTION_TYPES
} from "../actions/currency-converter.actions";
import { CurrencyConverterState } from "../store";
import { createEntityAdapter } from "@ngrx/entity";
import { HistoryRecord } from "../models/currency-converter.models";
import { HistoryRecordState } from "../entities/conversion-history.entity";

const historyAdapter = createEntityAdapter<HistoryRecord>();
const initialHistoryState: HistoryRecordState = historyAdapter.getInitialState({
  total: 0
});
const initialState: CurrencyConverterState = {
  fromCurrency: "CAD",
  toCurrency: "USD",
  exchangeRates: {},
  history: initialHistoryState
};

export function currencyConverterReducer(
  state = initialState,
  action: CurrencyConverterActionsUnion
) {
  switch (action.type) {
    case CURRENCY_ACTION_TYPES.CHANGE_FROM_CURRENCY: {
      const fromCurrency = action.payload;
      if (fromCurrency !== state.fromCurrency) {
        return {
          ...state,
          fromCurrency
        };
      } else {
        return state;
      }
    }
    case CURRENCY_ACTION_TYPES.CHANGE_TO_CURRENCY: {
      const toCurrency = action.payload;
      return {
        ...state,
        toCurrency
      };
    }
    case CURRENCY_ACTION_TYPES.UPDATE_EXCHANGE_RATES: {
      const exchangeRates = action.payload;
      return {
        ...state,
        exchangeRates
      };
    }
    // case CURRENCY_ACTION_TYPES.ADD_HISTORY_RECORD: {
    //   const newRecord = action.payload;
    //   return {
    //     ...state,
    //     history: [...state.history, newRecord]
    //   };
    // }
    case CURRENCY_ACTION_TYPES.ADD_HISTORY_RECORD: {
      const newRecord = action.payload;
      const newTotal = state.history.total + 1;
      return {
        ...state,
        history: historyAdapter.addOne(
          { ...newRecord, id: newTotal + "" },
          { ...state.history, total: newTotal }
        )
      };
    }
    case CURRENCY_ACTION_TYPES.DELETE_HISTORY_RECORD: {
      const id = action.payload;
      const newTotal = state.history.total - 1;
      return {
        ...state,
        history: historyAdapter.removeOne(id, {
          ...state.history,
          total: newTotal
        })
      };
    }
    default: {
      return state;
    }
  }
}
