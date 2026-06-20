import React from 'react'
import { Link, useNavigate } from 'react-router'
import { Popover } from '../ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role == 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#3d0899]">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="w-10 h-10 rounded-full !important cursor-pointer">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto} alt='@shadcn'
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className='w-80 border border-gray-300 rounded-lg shadow-lg bg-white'>
                                    <div className='p-4'>
                                        <div className='flex gap-4'>
                                            <Avatar className="w-10 h-10 rounded-full !important cursor-pointer">
                                                <AvatarImage
                                                    src={user?.profile?.profilePhoto} alt='@shadcn'
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col text-gray-600 mt-4 gap-3'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='w-full'>
                                                        <Button variant="link" className="border border-gray-300 font-medium rounded-md px-4 py-2 w-full justify-start gap-2 cursor-pointer">
                                                            <User2 className="w-4 h-4" />
                                                            <Link to="/profile">View Profile</Link>
                                                        </Button>
                                                    </div>
                                                )
                                            }

                                            <div className='w-full'>
                                                <Button onClick={logoutHandler} variant="link" className="border border-gray-300 font-medium rounded-md px-4 py-2 w-full justify-start gap-2 cursor-pointer">
                                                    <LogOut className="w-4 h-4" />
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>
        </div>
    )
}
export default Navbar