import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmbedJWTToken from "../EmbedToRequest/EmbedJWTToken";
import getLoggedUser from "../Utilities/GetLoggedUser";
import { Button } from '@chakra-ui/react';
import "./Blog.css";


export default function CreateBlog() {

    const [tit, settitle] = useState("");
    const [des, setdes] = useState("");
    const [shortDesc, setshortDesc] = useState('');
    const [image, setimage] = useState([]);
    const [imageURL, setImageURL] = useState([]);
    const [linkImage, setlinkImageURL] = useState('');
    const [doing, setdoing] = useState(false);

    const isAuth = useSelector((store) => store.isAuth.isAuth);
    const navigate = useNavigate();

    // Checking for Auth
    useEffect(() => {
        if (!isAuth) navigate("/");
    }, []);

    useEffect(() => {
        if (image.length < 1) return;
        else convertImgetoURL();
    }, [image])

    const handlePost = () => {
        if (doing) {
            alert("Wait for some time !");
        } else if (tit.length === 0 || des.length === 0) {
            alert("Kindly complete your blog inputs !")
        } else {
            setdoing(true);
            const loggedUser = getLoggedUser();
            let payload = {
                title: tit,
                description: des,
                createdby: loggedUser._id,
                shortDesc: shortDesc,
                headerImage: linkImage.length > 0 ? linkImage : imageURL[0]
            }
            //  let url = `http://localhost:8080/post/${loggedUser._id}`;
            let url = `https://mern-app-blog-ver01.onrender.com/post/${loggedUser._id}`;

            const authAxios = EmbedJWTToken(url);
            authAxios.post(url, payload).
                then((res) => {
                    if (res.status === 201) {
                        alert("Blog Posted");
                        settitle("");
                        setdes("");
                        setlinkImageURL("");
                        setshortDesc("");
                        setImageURL([]);
                    }
                    else alert("Something wrong !");
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
                <form>
                    <input className="title" type="text" name="" id="title" value={tit} onChange={(e) => settitle(e.target.value)} placeholder="Title" />
                    <textarea className="shortDesc" type="text" name="" id="title" value={shortDesc} onChange={(e) => setshortDesc(e.target.value)} placeholder="Blog Header" />
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