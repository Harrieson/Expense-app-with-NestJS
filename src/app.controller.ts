/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ReportTypes, data } from "src/data";
import { AppService } from "./app.service";
import { CreateReportDTO, updateReportDTO } from './dtos/report.dto';

@Controller('report/:type')
export class AppController {

  constructor(
    private readonly appService: AppService
  ) {}


  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportTypes)) type: string) {
    const reportType = type === 'income' ? ReportTypes.Income : ReportTypes.Expense 
    return this.appService.getAllReports(reportType)
  }
  @Get(':id')
  getReportByID(@Param('type', new ParseEnumPipe(ReportTypes)) type: string, @Param('id', ParseUUIDPipe) id: string) {
   const reportType = type === 'income' ? ReportTypes.Income : ReportTypes.Expense;
   return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport( @Body() {amount, source}: CreateReportDTO,
   @Param('type', new ParseEnumPipe(ReportTypes)) type: string) {
    const reportType = type === 'income' ? ReportTypes.Income : ReportTypes.Expense;
    return this.appService.createReport(reportType, {amount, source})
  }


  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportTypes)) type: string,
    @Param('id', ParseUUIDPipe) id : string,
    @Body() body: updateReportDTO
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
  deleteReport(@Param('id',ParseUUIDPipe) id: string) {
   const reportIndex = data.report.findIndex(report => report.id === id)

   if ( reportIndex === -1) return;

   data.report.splice(reportIndex, 1)

   return ` Report with ID ${id} has been deleted`
  }
}