import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Flex, Box, Avatar, Heading, IconButton, Text, Image, Button } from '@chakra-ui/react';
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./PublishedBlogs.css";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import formateDate from '../Utilities/SetDate';
import { useState } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup
} from '@chakra-ui/react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getPublishedDone } from '../Redux/BlogsContext.js/action';
import EmbedJWTToken from '../EmbedToRequest/EmbedJWTToken';
import { DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons';
import swal from 'sweetalert';
import {BookmarkBlog} from '../Utilities/BookmarkBlog';
import { updateUser } from '../Redux/Auth-context/action';


export default function SingleBlog({ blog }) {

    const [dates, setdates] = useState({});
    const cookie = new Cookies();
    // const loggedUser = cookie.get("loggedUser") || undefined;
    const isAuth = useSelector((store) => store.user.isAuth);
    const loggedUser = useSelector((store) => { return store.user.userData });
    if(loggedUser == {}) loggedUser = undefined;
    const published = useSelector((store) => { return store.publishedBlogs.published })

    const [doing, setdoing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setdates(formateDate(blog.createdAt, blog.updatedAt))
    }, []);


    // <=================== DELETE a particular published blog ===================>
    const handleDelete = () => {
        //  let url = `http://localhost:8080/publish/${blog._id}`;
        let url = `https://mern-app-blog-ver01.onrender.com/publish/del/${blog._id}`;
        axios.delete(url).
            then((res) => {
                if (res.status === 200) {
                    let updated = published.filter((blg) => blg._id != blog._id);
                    dispatch(getPublishedDone(updated));
                    handleUpdateforDashboard();
                    swal("Blog deleted",{button : false, timer:1300});
                }
            }).catch((err) => console.log(err));
    }

    // Update data to databse
    const handleUpdateforDashboard = () => {
        setdoing(true);
        let payload = {
            published : false
        }
        //  let url = `http://localhost:8080/post/edit/${blogId}`;
        let url = `https://mern-app-blog-ver01.onrender.com/post/edit/${blog._id}`;
        const authAxios = EmbedJWTToken(url);
        authAxios.patch(url, payload).
            then((res) => {
                //
            }).catch((err) => {
                console.log(err);
            }).finally(() => setdoing(false));
    }

    // Add Blog in Bookmarks
    const handleBookmarkBlog=async()=>{
        try{
            await BookmarkBlog(blog._id);
            // if(!loggedUser.bookmarks.includes(blog._id))
             loggedUser.bookmarks = [...loggedUser.bookmarks,blog._id];
            //  console.log(loggedUser.bookmarks)
            dispatch(updateUser(loggedUser))
            swal("Blog Bookmarked", { timer: 1300, button: false });
        }
        catch(err){
            console.log(err)
        }
       
    }

    return (
        <>
            <Card maxW='xs' padding='0px' className='BlogCard'>
                <CardHeader padding='10px 5px' >
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            {/* <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' /> */}
                            {!blog.avatar ? <Avatar bg='teal.500' /> : <Avatar src={blog.avatar} bg='teal.500' />}

                            <Box>
                                <Heading size='sm'>{blog.user}</Heading>
                                <Text>{blog.curDate}</Text>
                                {/* <Text>{dates.Update } Time-{dates.UpdTime}</Text> */}
                            </Box>
                        </Flex>

                        <Menu closeOnSelect={false}>
                            <MenuButton colorScheme='white' color='black'>
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='See menu'
                                    icon={<BsThreeDotsVertical />}
                                />
                            </MenuButton>

                            <MenuList minWidth='150px' marginLeft="-110px" marginTop='-20px' backgroundColor='black' color='white'>
                                <MenuOptionGroup defaultValue='asc' type='radio' backgroundColor='black'>
                                     {isAuth ? loggedUser._id == blog.createdby ? <Text title='Delete Blog' _hover={{backgroundColor:"grey"}} onClick={handleDelete}  cursor='pointer' > {/*<DeleteIcon/> */}Delete</Text> : null : null} 
                                     {isAuth  ? <Text title='Bookmark Blog' _hover={{backgroundColor:"grey"}} onClick={()=>handleBookmarkBlog(blog._id)}  cursor='pointer' _disabled={loggedUser.bookmarks.includes(blog._id) ? true : false} > {/*<PlusSquareIcon/> */}BookMark</Text> : null } 
                                    {/* <MenuItemOption value='book' backgroundColor='black' ><PlusSquareIcon/> BookMark this</MenuItemOption> */}
                                    <MenuItemOption value='asc' _hover={{backgroundColor:"grey"}} backgroundColor='black'>Ascending</MenuItemOption>
                                    <MenuItemOption value='desc' _hover={{backgroundColor:"grey"}} backgroundColor='black'>Descending</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>

                    </Flex>
                </CardHeader>
                <CardBody marginTop='-10px' padding='18px 5px 4px'>
                    <Text height='120px' textAlign='start'>{blog.shortDesc}</Text>
                </CardBody >
                <Link to={`/post/${blog._id}`} state={{pathFrom : 'published'}}><Image
                    objectFit='cover'
                    src={blog.headerImage}
                    // src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Image Loading'
                    height='240px'
                    width='100%'
                /></Link>

                <CardFooter
                    justify='center'
                    // flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '100px',
                        },
                    }}
                >
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                        Like
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                        Comment
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                        Share
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}