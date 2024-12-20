import { Test, TestingModule } from '@nestjs/testing';
import { UploadToExpanseService } from '../../src/uploadToExpanse/uploadToExpanse.service';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../../src/db/bigQuery/bigquery.service';
import { FileUtilsService } from '../../src/utils/fileUtils/fileUtils.service';
import { CategoryService } from '../../src/category/category.service';
import { KeywordService } from '../../src/keyword/keyword.service';
import { UuidService } from '../../src/utils/uuid/uuid.service';
import { DateUtilsService } from '../../src/utils/dateUtils/dateUtils.service';

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
});
