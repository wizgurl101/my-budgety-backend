import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { CsvExpanse } from '../../uploadToExpanse/interface/csvExpanse.interface';
import { DateUtilsService } from '../dateUtils/dateUtils.service';

@Injectable()
export class FileUtilsService {
  constructor(private dateUtilsService: DateUtilsService) {}

  getDataFromCsv(filepath: string) {
    const readStream = createReadStream(filepath, { encoding: 'utf8' });

    return new Promise((resolve, reject) => {
      let dataList = [];
      readStream.on('data', (data) => {
        dataList.push(data);
      });

      readStream.on('error', (err) => {
        reject(err);
      });

      readStream.on('close', () => {
        resolve(dataList);
      });
    });
  }

  async getCsvExpanses(filepath: string): Promise<CsvExpanse[]> {
    let csv_expanses: CsvExpanse[] = [];

    try
    {
      const data = await this.getDataFromCsv(filepath);
      let expansesData = data[0].split("\r\n")

      expansesData.forEach((e) => {
        let items = e.split(",");

        if(items.length > 1)
        {
          let date = items[0]
          let name = items[1].toLowerCase()
          let amount = items[2]

          if(!name.includes("payment"))
          {
            let csv_expanse: CsvExpanse = {
              date: this.dateUtilsService.getDateTimeFromStr(date),
              name: name,
              amount: Number(amount),
              used: false
            }

            csv_expanses.push(csv_expanse)
          }
        }
      })
    }
    catch(error)
    {
      return error
    }

    return csv_expanses
  }
}
