import { Expanse } from '../../expanse/interfaces/expanse.interface';

export interface Category
{
    id: string;
    category_id: string;
    name: string;
    keywords: Expanse[]
}