import React, { useState, useEffect } from 'react';

import { ProductThead } from '@/constants/table';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5); // You can adjust this
    const [totalProducts, setTotalProducts] = useState(0);

    const thCellClasses = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider';

    // Dummy product data (replace with your actual data fetching logic)
    const dummyProducts = [
        { id: 1, name: 'Laptop', price: 1200, category: 'Electronics' },
        { id: 2, name: 'Smartphone', price: 800, category: 'Electronics' },
        { id: 3, name: 'T-Shirt', price: 25, category: 'Clothing' },
        { id: 4, name: 'Coffee Maker', price: 75, category: 'Appliances' },
        { id: 5, name: 'Desk Lamp', price: 40, category: 'Furniture' },
        { id: 6, name: 'Keyboard', price: 60, category: 'Electronics' },
        { id: 7, name: 'Mouse', price: 30, category: 'Electronics' },
        { id: 8, name: 'Jeans', price: 50, category: 'Clothing' },
        { id: 9, name: 'Blender', price: 90, category: 'Appliances' },
        { id: 10, name: 'Chair', price: 150, category: 'Furniture' },
        { id: 11, name: 'Monitor', price: 300, category: 'Electronics' },
        { id: 12, name: 'Headphones', price: 100, category: 'Electronics' },
        { id: 13, name: 'Sweater', price: 45, category: 'Clothing' },
        { id: 14, name: 'Toaster', price: 35, category: 'Appliances' },
        { id: 15, name: 'Sofa', price: 500, category: 'Furniture' }
    ];


    useEffect(() => {
        const fetchData = async () => {
            // await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
            setTotalProducts(dummyProducts.length);

            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const paginatedProducts = dummyProducts.slice(startIndex, endIndex);

            //setProducts(paginatedProducts);
        };

        fetchData();
    }, [currentPage, productsPerPage]);  //Re-fetch when page changes.

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    //const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); // No longer needed, handled in useEffect

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Products</h1>

            <div className="bg-white shadow-md rounded-md overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            {
                                ProductThead.map((th) => {
                                    return (
                                        <th className={thCellClasses} key={th.key}>
                                            { th.title }
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{product.id}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">${product.price}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{product.category}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <Pagination /> */}
            </div>
        </div>
    );
};

export default ProductTable;