import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ReportTypes, data } from './data';

interface PayLoadData {
  amount: number;
  source: string;
}
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
    return newReport;
  }
}
