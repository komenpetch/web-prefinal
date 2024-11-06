'use client';

import { useEffect, useState } from 'react';

type ProductType = {
    id: number;
    title: string;
    price: number;
};

const BASE_URL = `https://dummyjson.com/products`;
const URL_PRODUCT = `${BASE_URL}?limit=10&select=title,price`;
const URL_CATEGORY = `${BASE_URL}/categories`;

export default function MyComponent() {
    const [data, setData] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState<string>("");
    
    // fetch product
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(URL_PRODUCT);
                const result = await response.json();
                setData(result.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);

    // fetch category
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(URL_CATEGORY);
                const data = await response.json();
                setCategories(Array.isArray(data) ? data : data.map((item: { name: string }) => item.name));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, []);

    const AddCategory = () => {
        if (newCategory.trim()) {
            setCategories([newCategory, ...categories]);
            setNewCategory("");
        }
    };

    const DeleteProduct = async (id: number) => {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            console.log(result);
            setData(data.filter(product => product.id !== id));
    };

    if (!data) return <div className='text-black'>Loading</div>;

    return (
        <div className="p-4">
            <header className="bg-white py-4">
                <h1 className="text-black text-3xl flex justify-center font-bold">Product List 2024</h1>
            </header>

            <div className="flex -mt-6">
                {/* Category*/}
                <div className="w-1/2 p-4">
                    <h2 className="text-black text-lg mb-2">Add new category</h2>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="border p-1 mr-2 text-black border-black"
                    />
                    <button onClick={AddCategory} className="border px-2 py-1 text-black border-black">
                        Add
                    </button>

                    <h2 className="text-black text-lg mt-4 font-medium">Categories</h2>
                    <ul className="mt-2">
                        {categories.map((category, index) => (
                            <li key={index} className="mb-1 text-black">
                                {index + 1}. {typeof category === 'string' ? category : category.name}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Category*/}

                {/* Product*/}
                <div className="w-1/2 p-4">
                    <div className="gap-6 space-y-2 text-black text-lg">Products
                        {data.map((product) => (
                            <div key={product.id} className="p-5 bg-indigo-200 rounded-md shadow flex justify-between relative border-2 border-black">
                                <p className='text-black'>{product.title}</p>
                                <p className='text-black'> {product.price}</p>
                                <button onClick={() => DeleteProduct(product.id)} className="text-xs text-red-500 bg-blue-50 absolute -top-1.5 -right-1 p-1 border-2 border-black rounded-tr-lg">
                                    X
                                </button>
                                <p className="text-xs text-blue-800 bg-blue-50 absolute bottom-0 right-0 p-1 rounded">{product.id}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Product*/}
            </div>
        </div>
    );
}
