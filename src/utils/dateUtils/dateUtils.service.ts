import { Injectable } from '@nestjs/common';

@Injectable()
export class DateUtilsService {
  getDateTimeFromStr(dateString: string): Date {
    const date = dateString.split('/');
    let monthNumber = Number(date[0]);
    const newDate = new Date(Number(date[2]), --monthNumber, Number(date[1]));
    newDate.setUTCHours(0, 0, 0, 0);
    return newDate;
  }
}
