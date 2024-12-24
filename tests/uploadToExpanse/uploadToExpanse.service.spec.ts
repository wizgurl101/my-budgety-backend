import { Test, TestingModule } from '@nestjs/testing';
import { UploadToExpanseService } from '../../src/uploadToExpanse/uploadToExpanse.service';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../../src/db/bigQuery/bigquery.service';
import { FileUtilsService } from '../../src/utils/fileUtils/fileUtils.service';
import { CategoryService } from '../../src/category/category.service';
import { KeywordService } from '../../src/keyword/keyword.service';
import { UuidService } from '../../src/utils/uuid/uuid.service';
import { DateUtilsService } from '../../src/utils/dateUtils/dateUtils.service';
import { ExpanseService } from '../../src/expanse/expanse.service';
import { CsvExpanse } from '../../src/uploadToExpanse/interface/csvExpanse.interface';
import { Category } from '../../src/category/interfaces/category.interface';
import { MISC_CATEGORY_NAME } from '../../src/category/constants/category.tablenames';

describe('UploadToExpanseService', () => {
  let uploadToExpanseService: UploadToExpanseService;
  let categoryService: CategoryService;
  let bigQueryService: BigQueryService;
  let configService: ConfigService;
  let uuidService: UuidService;
  let keywordService: KeywordService;
  let fileUtilsService: FileUtilsService;
  let dateUtilsService: DateUtilsService;
  let expanseService: ExpanseService;

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
        },
        {
          provide: ExpanseService,
          useValue: {
            create: jest.fn(),
          },
        },
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
    expanseService = module.get<ExpanseService>(ExpanseService);

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
        },
        {
          provide: ExpanseService,
          useValue: {
            create: jest.fn(),
          },
        },
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
    expanseService = module.get<ExpanseService>(ExpanseService);

    const testCsvData: CsvExpanse[] = [
      { date: new Date(), name: 'husky station', amount: 10, used: false },
      { date: new Date(), name: 'shell gas pump 25', amount: 25, used: false },
    ];

    const testCategories: Category[] = [
      {
        id: '1',
        category_id: 'cat1',
        name: 'gas',
        keywords: [
          { id: '1', keyword_id: 'key1', category_id: 'cat1', name: 'husky' },
          { id: '2', keyword_id: 'key2', category_id: 'cat1', name: 'shell' },
        ],
        expanses: [],
      },
      {
        id: '2',
        category_id: 'cat2',
        name: MISC_CATEGORY_NAME,
        keywords: [],
        expanses: [],
      },
    ];

    const result = uploadToExpanseService.SortCsvDataByCategory(
      testCsvData,
      testCategories,
    );
    const result_expanses = result[0].expanses;
    const result_expanses_misc = result[1].expanses;

    expect(result_expanses.length).toBe(2);
    expect(result_expanses[0].name).toBe('husky station');
    expect(result_expanses[1].name).toBe('shell gas pump 25');

    expect(result_expanses_misc.length).toBe(0);
  });

  it('Sort Csv Data By Category function should sort unused expenses into misc category', async () => {
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
        },
        {
          provide: ExpanseService,
          useValue: {
            create: jest.fn(),
          },
        },
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
    expanseService = module.get<ExpanseService>(ExpanseService);

    const testCsvData: CsvExpanse[] = [
      {
        date: new Date(),
        name: '20 mudkip plushies',
        amount: 100,
        used: false,
      },
      {
        date: new Date(),
        name: 'my enemy tears',
        amount: 1000000,
        used: false,
      },
    ];

    const testCategories: Category[] = [
      {
        id: '1',
        category_id: 'cat1',
        name: 'gas',
        keywords: [
          { id: '1', keyword_id: 'key1', category_id: 'cat1', name: 'husky' },
          { id: '2', keyword_id: 'key2', category_id: 'cat1', name: 'shell' },
        ],
        expanses: [],
      },
      {
        id: '2',
        category_id: 'cat2',
        name: MISC_CATEGORY_NAME,
        keywords: [],
        expanses: [],
      },
    ];

    const result = uploadToExpanseService.SortCsvDataByCategory(
      testCsvData,
      testCategories,
    );
    const result_expanses = result[0].expanses;
    const result_expanses_misc = result[1].expanses;

    expect(result_expanses.length).toBe(0);
    expect(result_expanses_misc.length).toBe(2);
    expect(result_expanses_misc[0].name).toBe('20 mudkip plushies');
    expect(result_expanses_misc[1].name).toBe('my enemy tears');
  });
});
