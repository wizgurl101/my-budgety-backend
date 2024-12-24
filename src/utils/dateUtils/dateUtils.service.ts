import { Injectable } from '@nestjs/common';

const monthNumShortName = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sept',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

@Injectable()
export class DateUtilsService {
  getDateTimeFromStr(dateString: string): Date {
    const date = dateString.split('/');
    let monthNumber = Number(date[0]);
    return new Date(Number(date[2]), --monthNumber, Number(date[1]));
  }
}
