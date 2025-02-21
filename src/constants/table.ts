import type { THead } from "@/types/table";

export const ProductThead: THead[] = [
    {
        title: 'название продукта',
        key: 'name'
    },
    {
        title: 'цена',
        key: 'price'
    },
    {
        title: 'количество товара в наличии',
        key: 'stock'
    },
    {
        title: 'бренд товара',
        key: 'brand'
    },
    {
        title: 'средняя оценка продукта',
         key: 'reviews_count'
    },
    {
        title: 'количество отзывов на продукт',
        key: 'reviews_count'
    },
    {
        title: 'штрихкод товара',
        key: 'barcode'
    },
];
