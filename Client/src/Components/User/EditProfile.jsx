
import { Input, Stack, InputGroup, InputLeftElement,Button} from '@chakra-ui/react';
import { PhoneIcon, AttachmentIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import getLoggedUser from '../Utilities/GetLoggedUser';
import EmbedJWTToken from '../EmbedToRequest/EmbedJWTToken';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../Redux/Auth-context/action';

export default function EditProfile({userdetails,upadteduser,setShowEditForm}) {

    const [name,setname] = useState(userdetails.name || "");
    const [mobile,setmobile] = useState(userdetails.mobile || "");
    const [avatar,setavatar] = useState(userdetails.avatar || "");
    const [doing, setdoing] = useState(false);
    const dispatch = useDispatch();
    const loggedUser = useSelector((store) => { return store.user.userData });
    
        const handleEditProfile = () => {
            setdoing(true);
            // const loggedUser = getLoggedUser();\
           
            let payload = {
                name: name,
                email : loggedUser.email,
                mobile: mobile,
                avatar: avatar,
                _id : loggedUser._id
            }
            loggedUser.name = name;
            loggedUser.mobile = mobile;
            loggedUser.avatar = avatar;
            // let url = `http://localhost:8080/user/edit/${loggedUser._id}`;
             let url = `https://mern-app-blog-ver01.onrender.com/user/edit/${loggedUser._id}`;
    
            const authAxios = EmbedJWTToken(url);
            authAxios.patch(url, payload).
                then((res) => {
                    if (res.status === 201){ 
                        dispatch(updateUser(loggedUser));
                        upadteduser(payload);
                        const cookies = new Cookies();
                        cookies.set("loggedUser",payload);
                        setShowEditForm(false);
                    }
                    else alert("Something wrong !");
                }).catch((err) => {
                    console.log(err);
                }).finally(() => setdoing(false));
        }
    
    return (
        <>
            <Stack spacing={4}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<EditIcon color='gray.300' />}
                    />
                    <Input type='tel' value={name} onChange={(e)=>setname(e.target.value)} placeholder='Name' />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<PhoneIcon color='gray.300' />}
                    />
                    <Input type='tel' value={mobile} onChange={(e)=>setmobile(e.target.value)} placeholder='Phone number' />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<AttachmentIcon color='gray.300' />}
                    />
                    <Input type='tel' value={avatar}  onChange={(e)=>setavatar(e.target.value)} placeholder='Profile Image' />
                </InputGroup>
            </Stack>

            {doing ? <Button
                    isLoading
                    loadingText='Submitting'
                    colorScheme='teal'
                    variant='outline'
                >
                    Submit
                </Button> : <button className='EditProfileButton' onClick={handleEditProfile}>Edit</button>}
        </>
    )
}