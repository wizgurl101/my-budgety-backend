import { Test, TestingModule } from '@nestjs/testing';
import { UploadToExpanseService } from '../../src/uploadToExpanse/uploadToExpanse.service';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../../src/db/bigQuery/bigquery.service';
import { FileUtilsService } from '../../src/utils/fileUtils/fileUtils.service';
import { CategoryService } from '../../src/category/category.service';
import { KeywordService } from '../../src/keyword/keyword.service';
import { UuidService } from '../../src/utils/uuid/uuid.service';
import { DateUtilsService } from '../../src/utils/dateUtils/dateUtils.service';
import {CsvExpanse } from '../../src/uploadToExpanse/interface/csvExpanse.interface';
import { Category } from '../../src/category/interfaces/category.interface';

describe('UploadToExpanseService', () => {
  let uploadToExpanseService: UploadToExpanseService;
  let categoryService: CategoryService;
  let bigQueryService: BigQueryService;
  let configService: ConfigService;
  let uuidService: UuidService;
  let keywordService: KeywordService;
  let fileUtilsService: FileUtilsService;
  let dateUtilsService: DateUtilsService;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadToExpanseService,
        {
          provide: BigQueryService,
          useValue: {
            query: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: UuidService,
          useValue: {
            generate: jest.fn(),
          },
        },
        {
          provide: KeywordService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            getAllCategoryWithKeywords: jest.fn(),
          },
        },
        {
          provide: FileUtilsService,
          useValue: {
            getDataFromCsv: jest.fn(),
          },
        },
        {
          provide: DateUtilsService,
          useValue: {
            convertDate: jest.fn(),
          },
        }
      ],
    }).compile();

    uploadToExpanseService = module.get<UploadToExpanseService>(
      UploadToExpanseService,
    );
    categoryService = module.get<CategoryService>(CategoryService);
    bigQueryService = module.get<BigQueryService>(BigQueryService);
    configService = module.get<ConfigService>(ConfigService);
    uuidService = module.get<UuidService>(UuidService);
    keywordService = module.get<KeywordService>(KeywordService);
    fileUtilsService = module.get<FileUtilsService>(FileUtilsService);
    dateUtilsService = module.get<DateUtilsService>(DateUtilsService);

    expect(uploadToExpanseService).toBeDefined();
  });

  it('Sort Csv Data By Category function should return a list of categories', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadToExpanseService,
        {
          provide: BigQueryService,
          useValue: {
            query: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: UuidService,
          useValue: {
            generate: jest.fn(),
          },
        },
        {
          provide: KeywordService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            getAllCategoryWithKeywords: jest.fn(),
          },
        },
        {
          provide: FileUtilsService,
          useValue: {
            getDataFromCsv: jest.fn(),
          },
        },
        {
          provide: DateUtilsService,
          useValue: {
            convertDate: jest.fn(),
          },
        }
      ],
    }).compile();

    uploadToExpanseService = module.get<UploadToExpanseService>(
      UploadToExpanseService,
    );
    categoryService = module.get<CategoryService>(CategoryService);
    bigQueryService = module.get<BigQueryService>(BigQueryService);
    configService = module.get<ConfigService>(ConfigService);
    uuidService = module.get<UuidService>(UuidService);
    keywordService = module.get<KeywordService>(KeywordService);
    fileUtilsService = module.get<FileUtilsService>(FileUtilsService);
    dateUtilsService = module.get<DateUtilsService>(DateUtilsService);

    const testCsvData: CsvExpanse[] = [
      { date: new Date(), name: 'husky station', amount: 10,  used: false },
      { date: new Date(), name: 'shell gas pump 25', amount: 25,  used: false },
    ];

    const testCategories: Category[] = [
      {
        id: '1',
        category_id: 'cat1',
        name: 'gas',
        keywords: [{ id: '1', keyword_id: 'key1', category_id: 'cat1', name: 'husky' },
          { id: '2', keyword_id: 'key2', category_id: 'cat1', name: 'shell' }
        ],
        expanses: [],
      },
    ];

    const result = uploadToExpanseService
      .SortCsvDataByCategory(testCsvData, testCategories);
    const result_expanses = result[0].expanses;

    expect(result_expanses.length).toBe(2);
    expect(result_expanses[0].name).toBe('husky station');
    expect(result_expanses[1].name).toBe('shell gas pump 25');
  })
});
