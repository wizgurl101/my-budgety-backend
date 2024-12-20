import { Keyword } from '../../keyword/interfaces/keyword.interface';

export interface Category
{
    id: string;
    category_id: string;
    name: string;
    keywords: Keyword[]
}