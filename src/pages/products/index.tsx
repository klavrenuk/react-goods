import { useState, useEffect, useMemo } from 'react';
import { ProductThead } from '@/constants/table';
import { MOC_Products } from '@/mocs/products';
import { useRouter } from 'next/router';
import type { ProductsResponse, Product } from '@/types/products';
import "@/app/globals.css";

import api from '@/api';

const IconSort = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up" viewBox="0 0 16 16">
        <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
    </svg>
);

const IconSortDefault = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V8m4 4H8" />
    </svg>
);

const ProductTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
    const [visibleItems, setVisibleItems] = useState(5); // Количество отображаемых товаров

    const router = useRouter();

    const thCellClasses = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer sticky top-0 z-10';

    const setData = (data: ProductsResponse) => {
        setProducts(data.products);
    }

    useEffect(() => {
        const getProducts = () => {
            api({
                url: '/get_products',
                method: 'GET',
                params: {
                    page: currentPage,
                    limit: 10
                }
            }).then((response) => {
                setData(response.data);
            }).catch((err) => {
                console.error(err);
                if ([401, 422].includes(err.status)) {
                    setData(MOC_Products);
                }
            });
        }
        getProducts();
    }, [currentPage]);

    const sortedProducts = useMemo(() => {
        let sortableProducts = [...products];
        if (sortConfig !== null) {
            sortableProducts.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableProducts;
    }, [products, sortConfig]);

    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        if (scrollTop + clientHeight >= scrollHeight) {
            setVisibleItems((prev) => prev + 5);
            setCurrentPage((currentPage) => currentPage + 1);
        }
    };

    const logout = () => {
        api({
            url: '/logout',
            method: 'POST',
        })
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Продукты</h1>
                <button className='bg-blue-400 text-white px-4 py-2' onClick={logout}>Выйти</button>
            </div>
            
            <div className="bg-white shadow-md rounded-md overflow-hidden" onScroll={handleScroll} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="min-w-full leading-normal">
                    <thead className="bg-gray-100">
                        <tr>
                            {ProductThead.map((th) => (
                                <th className={thCellClasses} key={th.key} onClick={() => requestSort(th.key)}>
                                    <div className='flex flex-col gap-2'>
                                        <p className="h-[35px] overflow-hidden text-ellipsis line-clamp-2">{th.title}</p>
                                        <button className="h-[16px] w-[16px]">
                                            {sortConfig && sortConfig.key === th.key ? (
                                                sortConfig.direction === 'ascending' ? (
                                                    <IconSort />
                                                ) : (
                                                    <div className="rotate-180 h-[16px] w-[16px]">
                                                        <IconSort />
                                                    </div>
                                                )
                                            ) : (
                                                <IconSortDefault />
                                            )}
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.slice(0, visibleItems).map((product: Product) => (
                            <tr key={product.id}>
                                {ProductThead.map((th) => {
                                    const uniqueKey = `product-${product.id}-${th.key}`;
                                    return (
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" key={uniqueKey}>
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {product[th.key as keyof Product]}
                                            </p>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;
