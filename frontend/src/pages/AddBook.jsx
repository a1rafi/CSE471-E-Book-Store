import React, { useState } from 'react';
import axios from 'axios';

const AddBooks = () => {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
        genre: "",
        pdfLink: "",
    });
    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async () => {
        try {
            if (
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.price === "" ||
                Data.desc === "" ||
                Data.language === "" ||
                Data.genre === "" ||
                Data.pdfLink === ""
            ) {
                alert("All fields are required");
                return;
            } else {
                const response = await axios.post("http://localhost:3000/api/user/add-book",
                    Data,
                    { headers },
                );
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: "",
                    genre: "",
                    pdfLink: "",
                });
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className='h-[100%] p-0 md:p-4'>
            <h1 className='text-3xl md:text-5xl font-sembold text-zinc-500 mb-8'>Add Book</h1>
            <div className='p-4 bg-zinc-800 rounded'>
                <div>
                    <label htmlFor="" className='text-zinc-400'>
                        Image
                    </label>
                    <input type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='url of image'
                        name="url"
                        required
                        value={Data.url}
                        onChange={change}
                    />
                </div>

                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>
                        Title of book
                    </label>
                    <input type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='Title of book'
                        name='title'
                        required
                        value={Data.title}
                        onChange={change} />
                </div>

                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Author of Book</label>
                    <input
                        type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='author of book'
                        name="author"
                        required
                        value={Data.author}
                        onChange={change} />
                </div>

                <div className='mt-4 flex gap-4'>
                    <div className='w-3/6'>
                        <label htmlFor="" className='text-zinc-400'>
                            Language
                        </label>
                        <input type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='language of book'
                            name="language"
                            required
                            value={Data.language}
                            onChange={change} />
                    </div>

                    <div className='w-3/6'>
                        <label htmlFor="" className='text-zinc-400'>
                            Genre
                        </label>
                        <input type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='Genre of book'
                            name="genre"
                            required
                            value={Data.genre}
                            onChange={change} />
                    </div>

                    <div className='w-3/6'>
                        <label htmlFor="" className='text-zinc-400'>
                            Price
                        </label>
                        <input type="number"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='price of book'
                            name='price'
                            required
                            value={Data.price}
                            onChange={change} />
                    </div>
                </div>

                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>
                        Description of book
                    </label>
                    <textarea className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        rows="5"
                        placeholder="description of book"
                        name="desc"
                        required
                        value={Data.desc}
                        onChange={change} />
                </div>

                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>
                        PDF Link
                    </label>
                    <input type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='PDF link of book'
                        name="pdfLink"
                        required
                        value={Data.pdfLink}
                        onChange={change} />
                </div>

                <button
                    className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
                    onClick={submit}>
                    Add Book
                </button>
            </div>
        </div>
    );
};

export default AddBooks;