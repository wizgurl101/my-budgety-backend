import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { ConfigService } from '@nestjs/config';
import { UuidService } from '../utils/uuid/uuid.service';

describe('CategoryService ', () => {
    let categoryService: CategoryService;
    let bigQueryService: BigQueryService;
    let configService: ConfigService;
    let uuidService: UuidService;

    it('should be defined', async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoryService,
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
            ],
        }).compile();

        categoryService = module.get<CategoryService>(CategoryService);
        bigQueryService = module.get<BigQueryService>(BigQueryService);
        configService = module.get<ConfigService>(ConfigService);
        uuidService = module.get<UuidService>(UuidService);

        expect(categoryService).toBeDefined();
    });

    it('findOne should return one category', async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoryService,
                {
                    provide: BigQueryService,
                    useValue: {
                        query: jest.fn().mockReturnValue({ category_id: '1', name: 'victorXjayce' }),
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
            ],
        }).compile();

        categoryService = module.get<CategoryService>(CategoryService);
        bigQueryService = module.get<BigQueryService>(BigQueryService);
        configService = module.get<ConfigService>(ConfigService);
        uuidService = module.get<UuidService>(UuidService);

        const result = await categoryService.findOne('1');
        expect(result).toEqual({ category_id: '1', name: 'victorXjayce' });
    });

    //todo remove after testing github action
    it("test github action", () => {
        expect(1).toBe(1);
    })
});