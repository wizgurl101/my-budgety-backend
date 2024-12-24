import { Keyword } from '../../keyword/interfaces/keyword.interface';
import { CsvExpanse } from '../../uploadToExpanse/interface/csvExpanse.interface';

export interface Category {
  id: string;
  category_id: string;
  name: string;
  keywords: Keyword[];
  expanses: CsvExpanse[]
}
