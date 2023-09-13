/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReportTypes, data } from "src/data";
import { AppService } from "./app.service";

@Controller('report/:type')
export class AppController {

  constructor(
    private readonly appService: AppService
  ) {}


  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType = type === 'income' ? ReportTypes.Income : ReportTypes.Expense 
    return this.appService.getAllReports(reportType)
  }
  @Get(':id')
  getReportByID(@Param('type') type: string, @Param('id') id: string) {
   const reportType = type === 'income' ? ReportTypes.Income : ReportTypes.Expense;
   return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport( @Body() {amount, source}: {
    amount: number;
    source: string;
  }, @Param('type') type: string) {
    const reportType = type === 'income' ? ReportTypes.Income : ReportTypes.Expense;
    return this.appService.createReport(reportType, {amount, source})
  }


  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id : string,
    @Body() body: {amount: number; source: string}
  ) {
    const reportType= type === 'income' ? ReportTypes.Income : ReportTypes.Expense;

    const reportUpdate = data.report.filter((report) => report.type === reportType).find((report) => report.id === id)

    if (!reportUpdate) return


    const reportIndex = data.report.findIndex((report) => report.id === reportUpdate.id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body
    }

    return `Report with ID ${reportUpdate.id} has been updated`
  }

  @Delete(':id')
  deleteReport(@Param('id') id: string) {
   const reportIndex = data.report.findIndex(report => report.id === id)

   if ( reportIndex === -1) return;

   data.report.splice(reportIndex, 1)

   return ` Report with ID ${id} has been deleted`
  }
}