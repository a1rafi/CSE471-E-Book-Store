import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { authActions } from '../../redux/auth.js';
import axios from 'axios';

const Sidebar = ({ data }) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const role = useSelector(state => state.auth.role);

    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const availableGenres = ['Fiction', 'Non-Fiction'];

    useEffect(() => {
        const storedGenres = JSON.parse(localStorage.getItem('selectedGenres')) || [];

    

        if (storedGenres.length > 0) {
            setSelectedGenres(storedGenres);
        } else {
            const fetchGenres = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/api/user/get-genres', {
                        headers: {
                            id: localStorage.getItem('id'),
                            authorization: `Bearer ${localStorage.getItem('token')}`,
                        }
                    });
                    const genresFromApi = response.data.genres || [];
                    setSelectedGenres(genresFromApi);

                   
                    localStorage.setItem('selectedGenres', JSON.stringify(genresFromApi));
                } catch (error) {
                    console.error('Error fetching genres:', error);
                }
            };
            fetchGenres();
        }
    }, []);

    const handleGenreChange = (event) => {
        const genre = event.target.value;
        setSelectedGenres(prevGenres =>
            prevGenres.includes(genre)
                ? prevGenres.filter(item => item !== genre)
                : [...prevGenres, genre]
        );
    };

    const saveGenrePreferences = async () => {
        try {
            console.log('Selected genres before saving:', selectedGenres); // Debugging

            const response = await axios.put(
                'http://localhost:3000/api/user/update-genres',
                { genres: selectedGenres },
                {
                    headers: {
                        id: localStorage.getItem('id'),
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );

          

            console.log('Saving genres to localStorage:', response.data.genres); // Debugging
            localStorage.setItem('selectedGenres', JSON.stringify(response.data.genres || []));
            
            setIsEditing(false);
            setSelectedGenres(response.data.genres || []);
        } catch (error) {
            console.error('Error saving genre preferences:', error);
        }
    };

    return (
        <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
            <div className='flex items-center flex-col justify-center'>
                <img src={data.avatar} className='h-[12vh]' />
                <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data.username}</p>
                <p className='mt-1 text-sm text-zinc-300'>{data.email}</p>

                <div className='mt-4 w-full'>
                    <p className='text-sm text-zinc-300'>
                        Genre Preference: 
                        {isEditing ? (
                            <button className="text-blue-400 ml-2" onClick={saveGenrePreferences}>
                                Save
                            </button>
                        ) : (
                            <>
                                <span className="ml-2">{selectedGenres.join(', ') || 'None'}</span>
                                <button className="text-blue-400 ml-2" onClick={() => setIsEditing(true)}>
                                    [Edit]
                                </button>
                            </>
                        )}
                    </p>

                    {isEditing && (
                        <div className='mt-2'>
                            {availableGenres.map((genre) => (
                                <div key={genre} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={genre}
                                        checked={selectedGenres.includes(genre)}
                                        onChange={handleGenreChange}
                                        className="mr-2"
                                    />
                                    <label className="text-zinc-200">{genre}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
            </div>

            {role === "user" && (
                <div className='md:block lg:block hidden'>
                    <Link
                        to="/profile"
                        className="block text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        Wishlist
                    </Link>
                    <Link
                        to="/profile/orderHistory"
                        className="block text-zinc-100 font-semibold py-2 mt-4 text-center hover:bg-zinc-900 w-full rounded transition-all duration-300">
                        Order History
                    </Link>
                    <Link
                        to="/profile/settings"
                        className="block text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        Settings
                    </Link>
                </div>
            )}
            {role === "admin" && (
                <div className='md:block lg:block hidden'>
                    <Link
                        to="/profile"
                        className="block text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        All Orders
                    </Link>
                    <Link
                        to="/profile/add-book"
                        className="block text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        Add Book
                    </Link>
                </div>
            )}

            <button
                className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300'
                onClick={() => {
                    dispatch(authActions.logout());
                    dispatch(authActions.changeRole("user"));
                    localStorage.clear("id");
                    localStorage.clear("token");
                    localStorage.clear("role");
                    localStorage.clear("selectedGenres"); // Clear genres on logout
                    history("/");
                }}>
                Sign Out <FaArrowRightFromBracket className="ms-4" />
            </button>
        </div>
    );
};

export default Sidebar;
