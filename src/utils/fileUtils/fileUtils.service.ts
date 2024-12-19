import { Injectable } from '@nestjs/common';
import { createReadStream } from "fs";

@Injectable()
export class FileUtilsService {
  getDataFromCsv(filepath: string) {
    const readStream = createReadStream(filepath, { encoding: 'utf8' })

    return new Promise((resolve, reject) => {
      let dataList = [];
      readStream.on("data", (data) => {
        dataList.push(data);
      });

      readStream.on("error", (err) => {
        reject(err);
      });

      readStream.on("close", () => {
        resolve(dataList);
      });
    })
  }
}