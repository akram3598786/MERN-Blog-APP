import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmbedJWTToken from "../EmbedToRequest/EmbedJWTToken";
import getLoggedUser from "../Utilities/GetLoggedUser";
import { Alert, AlertIcon, Button, CloseButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'
import "./Blog.css";
import Cookies from 'universal-cookie';
import swal from "sweetalert";


export default function CreateBlog() {

    const [tit, settitle] = useState("");
    const [des, setdes] = useState("");
    const [shortDesc, setshortDesc] = useState('');
    const [image, setimage] = useState([]);
    const [imageURL, setImageURL] = useState([]);
    const [linkImage, setlinkImageURL] = useState('');
    const [doing, setdoing] = useState(false);
    const [done, setdone] = useState(false);

    const cookie = new Cookies();
    const loggedUser = cookie.get("loggedUser") || undefined;

    const isAuth = useSelector((store) => store.user.isAuth);
    const navigate = useNavigate();

    // Checking for Auth
    useEffect(() => {
        if (!isAuth || !loggedUser ) navigate("/login");
    }, []);

    useEffect(() => {
        if (image.length < 1) return;
        else convertImgetoURL();
    }, [image])

    const handlePost = () => {

        if (doing) {
            swal("Wait for some time !",{button: false});
        } else if (tit.length === 0 || des.length === 0) {
            swal("Complete Blogs deatils !",{button: false,icon:'error'});
        } else {
            setdoing(true);
            const loggedUser = getLoggedUser();
            let payload = {
                title: tit,
                description: des,
                user: loggedUser.name,
                createdby: loggedUser._id,
                shortDesc: shortDesc,
                headerImage: linkImage.length > 0 ? linkImage : imageURL[0]
            }
            // console.log(payload);
            // let url = `http://localhost:8080/post/${loggedUser._id}`;
            let url = `https://mern-app-blog-ver01.onrender.com/post/${loggedUser._id}`;

            const authAxios = EmbedJWTToken(url);
            authAxios.post(url, payload).
                then((res) => {
                    if (res.status === 201) {
                        swal({
                            title: "Created Successfully",
                            timer: 2000,
                            icon: 'success',
                            button: false,
                          })
                        setdone(true);
                        settitle("");
                        setdes("");
                        setlinkImageURL("");
                        setshortDesc("");
                        setImageURL([]);
                    }
                    else swal("Something wrong !");
                }).catch((err) => {
                    console.log(err);
                }).finally(() => setdoing(false));
        }
    }

    const convertImgetoURL = () => {
        const newImageURLs = [];
        image.forEach(img => newImageURLs.push(URL.createObjectURL(img)))
        setImageURL(newImageURLs);
    }

    const hangleImageUpload = (e) => {
        // console.log(e.target.files)
        setimage([...e.target.files]);
    }


    return (
        <div className="blogcreation">
            {/* <h2>Create Blog </h2> */}


            <div className="inputSec">
                {done ? <Alert  status='success' width='80%' display='flex' variant='top-accent' backgroundColor='green' margin='0px 10px'>
                    
                    <AlertIcon />
                    Blog Created successfully 
                    <CloseIcon 
                    position='absolute'
                    top='5px'
                    right="5px"
                    _hover={{background : "red"}}
                    cursor='pointer'
                    onClick={()=>setdone(false)}

                    />
                
                </Alert> : null}
                <form>
                    <input className="title" type="text" name="" id="title" value={tit} onChange={(e) => settitle(e.target.value)} placeholder="Title" />
                    <textarea className="shortDesc" type="text" maxlength="200" name="" id="title" value={shortDesc} onChange={(e) => setshortDesc(e.target.value)} placeholder="Blog Header" />
                    <div>
                        <input type="file" multiple accept="image/*" onChange={hangleImageUpload} />
                        <p style={{ fontSize: '20px', fontWeight: '18' }}>OR</p>
                        <input id="imageLink" style={{ borderRadius: '5px' }} type="text" value={linkImage} onChange={(e) => setlinkImageURL(e.target.value)} placeholder="Image URL" />
                    </div>
                    {imageURL.map(imgsrc => <img src={imgsrc} />)}
                    <textarea type="text" name="" id="" value={des} onChange={(e) => setdes(e.target.value)} placeholder="Description" /> <br />
                </form>
                {doing ? <Button
                    isLoading
                    loadingText='Submitting'
                    colorScheme='teal'
                    variant='outline'
                >
                    Submit
                </Button> : <button onClick={handlePost}>Post</button>}
            </div>
        </div>
    )
}