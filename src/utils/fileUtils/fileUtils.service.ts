import { Injectable } from '@nestjs/common';
import { createReadStream, readdir, unlink } from 'fs';
import { CsvExpanse } from '../../uploadToExpanse/interface/csvExpanse.interface';
import { DateUtilsService } from '../dateUtils/dateUtils.service';
import { join, dirname } from 'path';

@Injectable()
export class FileUtilsService {
  constructor(private dateUtilsService: DateUtilsService) {}

  getDataFromCsv(filepath: string) {
    const readStream = createReadStream(filepath, { encoding: 'utf8' });

    return new Promise((resolve, reject) => {
      const dataList = [];
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
    const csv_expanses: CsvExpanse[] = [];

    try {
      const data = await this.getDataFromCsv(filepath);
      const expansesData = data[0].split('\r\n');

      expansesData.forEach((e) => {
        const items = e.split(',');

        if (items.length > 1) {
          const date = items[0];
          const name = items[1].toLowerCase();
          const amount = items[2];

          if (!name.includes('payment')) {
            if (!name.includes('rewards redemption')) {
              const csv_expanse: CsvExpanse = {
                date: this.dateUtilsService.getDateTimeFromStr(date),
                name: name,
                amount: Number(amount),
                used: false,
              };

              csv_expanses.push(csv_expanse);
            }
          }
        }
      });
    } catch (error) {
      return error;
    }

    return csv_expanses;
  }

  async deleteCsvFilesFromUploadsFolder() {
    const distPath = dirname(require.main.filename);
    const uploadsDirectoryPath = join(distPath, '../src/uploads');

    return new Promise((resolve, reject) => {
      readdir(uploadsDirectoryPath, (err, files) => {
        if (err) {
          reject(err);
        }

        if (files.length === 0) {
          resolve('No csv files found in the uploads folder');
        }

        files.forEach((file) => {
          if (file.endsWith('.csv')) {
            const filePath = join(uploadsDirectoryPath, file);
            unlink(filePath, (err) => {
              if (err) reject(err);
            });
          }
        });

        resolve('All csv files deleted successfully');
      });
    });
  }
}
