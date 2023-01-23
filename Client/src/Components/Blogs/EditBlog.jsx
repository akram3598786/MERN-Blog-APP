import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import EmbedJWTToken from "../EmbedToRequest/EmbedJWTToken";
import getLoggedUser from "../Utilities/GetLoggedUser";
import "./Blog.css";


export default function EditBlog() {

    const [tit, settitle] = useState("");
    const [des, setdes] = useState("");
    const [shortDesc, setshortDesc] = useState('');
    const [image, setimage] = useState([]);
    const [imageURL, setImageURL] = useState([]);
    const [linkImage, setlinkImageURL] = useState('');
    const [doing, setdoing] = useState(false);

    const { blogId } = useParams();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (image.length < 1) return;
        else convertImgetoURL();
    }, [image])

    // Get Data for editing
    function getData() {
       //  let url = `http://localhost:8080/post/${blogId}`;
        let url = `https://mern-app-blog-ver01.onrender.com/post/${blogId}`;

        const authAxios = EmbedJWTToken(url);
        authAxios.get(url).
            then((res) => {
                //  console.log(res.data);
                settitle(res.data.title);
                setshortDesc(res.data.shortDesc);
                setImageURL([res.data.headerImage])
                setlinkImageURL(res.data.headerImage)
                setdes(res.data.description);
            }).
            catch((err) => console.log(err))
    }

    // Update data to databse
    const handleUpdate = () => {
        setdoing(true);
        const loggedUser = getLoggedUser();
        let payload = {
            title: tit,
            description: des,
            user : loggedUser.name,
            createdby: loggedUser._id,
            shortDesc: shortDesc,
            headerImage: linkImage.length > 0 ? linkImage : imageURL[0]
        }
       //  let url = `http://localhost:8080/post/edit/${blogId}`;
        let url = `https://mern-app-blog-ver01.onrender.com/post/edit/${blogId}`;

        const authAxios = EmbedJWTToken(url);
        authAxios.patch(url, payload).
            then((res) => {
                if (res.status === 200) swal("Blog Updated",{timer : 2000,button : false});
                else swal("Something wrong !");
            }).catch((err) => {
                console.log(err);
            }).finally(()=>setdoing(false));
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
            {/* <h2>Edit Blog </h2> */}
            <div className="inputSec">
            <form>
                    <input className="title" type="text" name="" id="title" value={tit} onChange={(e) => settitle(e.target.value)} placeholder="Title" />
                    <textarea  className="shortDesc" type="text" maxlength="200" name="" id="title" value={shortDesc} onChange={(e) => setshortDesc(e.target.value)} placeholder="Blog Header" />
                    <div>
                    <input type="file" multiple accept="image/*" onChange={hangleImageUpload}/>
                    <p style={{fontSize:'20px',fontWeight:'18'}}>OR</p>
                    <input id="imageLink" style={{ borderRadius : '5px'}} type="text" value={linkImage} onChange={(e)=>setlinkImageURL(e.target.value)} placeholder="Image URL"/>
                    </div>
                    {imageURL.map(imgsrc => <img src={imgsrc}/>)}
                    <textarea type="text" name="" id="" value={des} onChange={(e) => setdes(e.target.value)} placeholder="Description" /> <br />
                </form>
                <button onClick={handleUpdate}>Post</button>
                {/* {doing ? <Button
                    isLoading
                    loadingText='Submitting'
                    colorScheme='teal'
                    variant='outline'
                >
                    Submit
                </Button> : <button onClick={handleUpdate}>Post</button>} */}
            </div>
        </div>
    )
}