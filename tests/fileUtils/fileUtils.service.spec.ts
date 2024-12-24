import { Test, TestingModule } from '@nestjs/testing';
import { FileUtilsService } from '../../src/utils/fileUtils/fileUtils.service';
import { DateUtilsService } from '../../src/utils/dateUtils/dateUtils.service';

describe('File Utils Service', () => {
  let fileUtilsService: FileUtilsService;
  let dateUtilsService: DateUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUtilsService, DateUtilsService],
    }).compile();

    fileUtilsService = module.get<FileUtilsService>(FileUtilsService);
    dateUtilsService = module.get<DateUtilsService>(DateUtilsService);
  });

  it('Get Data From Csv function should return a list of expanses', async () => {
    const mockCsvData = [
      '12/19/2024,husky,10,,272.61\r\n12/19/2024,shell,25,,272.6\r\n',
    ];

    jest
      .spyOn(fileUtilsService, 'getDataFromCsv')
      .mockResolvedValue(mockCsvData);

    const result = await fileUtilsService.getCsvExpanses('mockFilePath');
    expect(result).toEqual([
      {
        date: new Date('2024-12-19T07:00:00.000Z'),
        name: 'husky',
        amount: 10,
        used: false,
      },
      {
        date: new Date('2024-12-19T07:00:00.000Z'),
        name: 'shell',
        amount: 25,
        used: false,
      },
    ]);
  });

  it('Given a payment entry in the csv Then Get Data From Csv function should return the a list of one expanses', async () => {
    const mockCsvData = [
      '12/19/2024,husky,10,,272.61\r\n12/19/2024,payment,,50,272.6\r\n',
    ];

    jest
      .spyOn(fileUtilsService, 'getDataFromCsv')
      .mockResolvedValue(mockCsvData);

    const result = await fileUtilsService.getCsvExpanses('mockFilePath');
    expect(result).toEqual([
      {
        date: new Date('2024-12-19T07:00:00.000Z'),
        name: 'husky',
        amount: 10,
        used: false,
      },
    ]);
  });
});
