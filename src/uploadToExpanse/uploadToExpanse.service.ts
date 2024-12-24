import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { FileUtilsService } from '../utils/fileUtils/fileUtils.service';
import { CategoryService } from '../category/category.service';
import { DateUtilsService } from '../utils/dateUtils/dateUtils.service';
import { ExpanseService } from '../expanse/expanse.service';
import { Category } from '../category/interfaces/category.interface';
import { CsvExpanse } from './interface/csvExpanse.interface';
import { MISC_CATEGORY_NAME } from '../category/constants/category.tablenames';

@Injectable()
export class UploadToExpanseService {
  private readonly projectId = this.configService.get<string>('PROJECT_ID');
  private readonly projectName = this.configService.get<string>('PROJECT_NAME');

  constructor(
    private configService: ConfigService,
    private bigQueryService: BigQueryService,
    private fileUtilsService: FileUtilsService,
    private categoryService: CategoryService,
    private dateUtilsService: DateUtilsService,
    private expanseService: ExpanseService
  ) {}

  public SortCsvDataByCategory(
    csvData: CsvExpanse[],
    categoryData: Category[],
  ): Category[] {
    categoryData.forEach((category) => {
      let categoryExpense = [];
      const keywords = category.keywords;

      if (keywords.length > 0) {
        keywords.forEach((keyword) => {
          csvData.forEach((data) => {
            if (data.name.includes(keyword.name)) {
              categoryExpense.push(data);
              data.used = true;
            }
          });
        });
      }

      categoryExpense.sort((a, b) => {
        return a.date - b.date;
      });

      category.expanses = [...categoryExpense];
    });

    const unusedExpenses = csvData.filter(
      (expense) => expense.used === false);

    let misc_category_index = categoryData.findIndex(
      (category) => category.name === MISC_CATEGORY_NAME,
    );
    let misc_category = categoryData[misc_category_index];
    misc_category.expanses = [...unusedExpenses];

    return [...categoryData];
  }

  async uploadCsv(file: Express.Multer.File, userId: string) {
    try {
      const CsvData = await this.fileUtilsService.getCsvExpanses(file.path);
      const categories: Category[] =
        await this.categoryService.getAllCategoryWithKeywords(userId);

      const category_with_csv_data = this.SortCsvDataByCategory(
        CsvData,
        categories,
      );

      for(const category of category_with_csv_data)
      {
        for(const expanse of category.expanses)
        {
          const date = `${expanse.date.getFullYear()}-${expanse.date.getMonth() + 1}-${expanse.date.getDate()}`;
          await this.expanseService.create(category.category_id,
            date, expanse.name, expanse.amount);
        }
      }

      return { message: 'successfully upload csv data to expanse table'};
    } catch (error) {
      console.log(error);
      return { message: 'failed to export csv data to expanse table' };
    }
  }
}
