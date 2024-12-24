import { Test, TestingModule } from '@nestjs/testing';
import { FileUtilsService } from '../../src/utils/fileUtils/fileUtils.service';
import { DateUtilsService } from '../../src/utils/dateUtils/dateUtils.service';

describe('File Utils Service', () => {
  let fileUtilsService: FileUtilsService;
  let dateUtilsService: DateUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileUtilsService,
        DateUtilsService,
      ],
    }).compile();

    fileUtilsService = module.get<FileUtilsService>(FileUtilsService);
    dateUtilsService = module.get<DateUtilsService>(DateUtilsService);
  });

  it('should mock getDataFromCsv method', async () => {
    const mockCsvData = [
      "12/19/2024,husky,10,,272.61\r\n12/19/2024,shell,25,,272.6\r\n"
    ];

    jest.spyOn(fileUtilsService, 'getDataFromCsv').mockResolvedValue(mockCsvData);

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
});