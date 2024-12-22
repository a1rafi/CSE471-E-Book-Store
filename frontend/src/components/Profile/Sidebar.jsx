import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/auth.js';

const Sidebar = ({ data }) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const role = useSelector(state => state.auth.role);

    return (
        <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
            <div className='flex items-center flex-col justify-center'>
                <img src={data.avatar} className='h-[12vh]' alt="User Avatar" />
                <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data.username}</p>
                <p className='mt-1 text-sm text-zinc-300'>{data.email}</p>

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
                    <Link
                        to="/profile/ComplainPage"
                        className="block text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        Complain
                    </Link>
                </div>
            )}
            {role === "admin" && (
                <div className='md:block lg:block hidden'>
                    <Link
                        to="/profile/admin-dashboard"
                        className="block text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        Admin Dashboard
                    </Link>
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
                    <Link
                        to="/profile/view-complaints"
                        className="block text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        View Complaints
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
                    history("/");
                }}>
                Sign Out <FaArrowRightFromBracket className="ms-4" />
            </button>
        </div>
    );
};

export default Sidebar;
