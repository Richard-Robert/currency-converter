import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { HistoryRecord } from "../models/currency-converter.models";

export interface HistoryRecordState extends EntityState<HistoryRecord> {
  total: number;
}
