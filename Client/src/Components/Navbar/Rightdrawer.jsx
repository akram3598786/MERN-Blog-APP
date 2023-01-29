import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    Text,
    Flex,
    Avatar,
    Badge,
    Box,
    List,
    ListItem,
    ListIcon,
    Divider,

} from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { RiAwardFill, RiBookMarkFill, RiGroupFill, RiHeart3Fill, RiProfileFill, RiTeamFill, RiTeamLine } from 'react-icons/ri';
import { isAuthHandler } from '../Redux/Auth-context/action';
import { useDispatch, useSelector } from 'react-redux';

export default function Right_Drawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef();
    const cookie = new Cookies();
    // const loggedUser = cookie.get("loggedUser") || undefined;
    const loggedUser = useSelector((store) => { return store.user.userData });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignout = () => {
        const cookies = new Cookies();
        cookies.remove("AccessToken");
        cookies.remove("loggedUser");
        dispatch(isAuthHandler(false));
        navigate("/login");
      }

    return (
        <>
            <h1 ref={btnRef} style={{ cursor: 'pointer' }} colorScheme='teal' onClick={onOpen}>
                Account
            </h1>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Flex>
                            <Avatar src={loggedUser ? loggedUser.avatar: "" } />
                            <Box ml='3'>
                                <Text fontWeight='bold'>
                                {loggedUser ? loggedUser.name: "" }
                                    <Badge ml='1' colorScheme='green'>
                                        New
                                    </Badge>
                                </Text>
                                <Text fontSize='sm'>Full Stack Engineer</Text>
                            </Box>
                        </Flex>

                    </DrawerHeader>

                    <DrawerBody>
                        <Input placeholder='Search' />

                        <Divider orientation='horizontal' />
                        <List spacing={3} marginTop='15px'>
                       
                            <ListItem style={{ padding: '3px 2px' }} _hover={{ backgroundColor: 'black', borderRadius: '8px', color: 'white' }}>
                            <Link to="/profile" style={{ fontSize: 'md', fontWeight: 'bold' }}>
                                 <ListIcon as={RiProfileFill} width='50px' color='red.600' />
                                View Profile</Link>
                            </ListItem>
                            <ListItem style={{ padding: '3px 2px' }} _hover={{ backgroundColor: 'black', borderRadius: '8px', color: 'white' }}>
                            <Link to='/bookmarks' style={{ fontSize: 'md', fontWeight: 'bold' }} >
                                 <ListIcon as={RiBookMarkFill} width='50px' color='red.600' />
                                Bookmarks</Link>
                            </ListItem>
                            <ListItem style={{ padding: '3px 2px' }} _hover={{ backgroundColor: 'black', borderRadius: '8px', color: 'white' }}>
                            <Link to='/profile' style={{ fontSize: 'md', fontWeight: 'bold' }} >
                                 <ListIcon as={RiAwardFill} width='50px' color='red.600' />
                                Subscriptions</Link>
                            </ListItem>
                            <ListItem style={{ padding: '3px 2px' }} _hover={{ backgroundColor: 'black', borderRadius: '8px', color: 'white' }}>
                            <Link to='/profile' style={{ fontSize: 'md', fontWeight: 'bold' }} >
                                 <ListIcon as={RiTeamFill} width='50px' color='red.600' />
                                Teams</Link>
                            </ListItem>
                            <ListItem style={{ padding: '3px 2px' }} _hover={{ backgroundColor: 'black', borderRadius: '8px', color: 'white' }}>
                            <Link to='/profile' style={{ fontSize: 'md', fontWeight: 'bold' }} >
                                <ListIcon as={RiGroupFill} width='50px' color='red.600' />
                                Connections</Link>
                            </ListItem>
                            <ListItem style={{ padding: '3px 2px' }} _hover={{ backgroundColor: 'black', borderRadius: '8px', color: 'white' }}>
                            <Link to='/profile' style={{ fontSize: 'md', fontWeight: 'bold' }} >
                                <ListIcon as={RiHeart3Fill} width='50px' color='red.600' />
                                Favorites</Link>
                            </ListItem>
                        </List>
                         
                    </DrawerBody>

                    <DrawerFooter>
                        {/* <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button> */}
              <Button colorScheme='red' onClick={handleSignout}>Sign Out</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}