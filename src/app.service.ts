import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ReportTypes, data } from './data';
import { ReportResponse } from './dtos/report.dto';

interface PayLoadData {
  amount: number;
  source: string;
}

// interface PayLoadDataUpdate {
//   amount?: number;
//   source?: string;
// }
@Injectable()
export class AppService {
  getAllReports(type: ReportTypes) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportTypes, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }
  createReport(type: ReportTypes, { amount, source }: PayLoadData) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return ReportResponse;
  }
}
