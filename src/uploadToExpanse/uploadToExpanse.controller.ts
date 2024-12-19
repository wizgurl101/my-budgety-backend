import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { UploadToExpanseService } from './uploadToExpanse.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const generateFilename = (req, file, callback) => {
    const filename = Date.now() + '_expanses';
    const extension = extname(file.originalname);
    callback(null, `${filename}${extension}`);
}

const checkFileExtension = (req, file, callback) => {
    if (file.mimetype !== 'text/csv') {
        return callback(new Error('Only CSV files are allowed'));
    }
    callback(null, true);
}

@Controller('uploadToExpanse')
export class UploadToExpanseController {
    constructor(private readonly uploadToExpanseService: UploadToExpanseService) {}

    @Post('csv')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage(
          {
              destination: './uploads',
              filename: generateFilename
          }),
        fileFilter: checkFileExtension
    }))
    async uploadCsvToExpanse(@UploadedFile() file: Express.Multer.File,
                             @Body('userId') userId: string) {
        return this.uploadToExpanseService.uploadCsv(file, userId);
    }
}