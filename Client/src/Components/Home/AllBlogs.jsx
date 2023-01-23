import { CloseIcon } from "@chakra-ui/icons";
import swal from 'sweetalert';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmbedJWTToken from "../EmbedToRequest/EmbedJWTToken";
import getLoggedUser from "../Utilities/GetLoggedUser";
import styles from "./Homepage.style.css";
import ProgresSkelton from "./ProgressBlogsSkel";

export default function AllBlogs() {
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(false);
    const [searchStr, setsearchStr] = useState("");
    const [allbogs, setallblogs] = useState([]);
    const [blogs, setblogs] = useState([]);
    const [page, setPage] = useState(1);
    const [done, setdone] = useState(false);

    let [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        setloading(true);
        getBlogsforPage();
        getAllBlogs();
    }, []);

    useEffect(() => {
        setloading(true);
        getBlogsforPage();
    }, [page])

    // <================ GET all blogs for searching out of all existing =================>
    const getAllBlogs = () => {
        const loggedUser = getLoggedUser();
        // let url = `http://localhost:8080/post/${loggedUser._id}/all`;
        let url = `https://mern-app-blog-ver01.onrender.com/post/${loggedUser._id}/all`;

        const authAxios = EmbedJWTToken(url);
        authAxios.get(url).
            then((res) => {
                //    console.log(res)
                setallblogs(res.data.posts);
                if (res.data.posts.length == 0) setPage(0);
            }).
            catch((err) => {
                console.log(err);
                setPage(0);

            })
    }

    // <==================== GET blogs for page according to page limit ====================>
    const getBlogsforPage = () => {
        const loggedUser = getLoggedUser();

        //  let url = `http://localhost:8080/post/${loggedUser._id}/all?_limit=6&&page=${page-1}`;
        let url = `https://mern-app-blog-ver01.onrender.com/post/${loggedUser._id}/all?_limit=6&&page=${page - 1}`;

        const authAxios = EmbedJWTToken(url);
        authAxios.get(url).
            then((res) => {
                //   console.log(res.data)
                setblogs(res.data.posts);
                setTotalCount(res.data.totalCount)
            }).
            catch((err) => {
                setError(true);
                console.log(err);

            }).
            finally((res) => setloading(false));
    }

    // <=================== DELETE a particular blog ===================>
    const handleDelete = (id) => {
        // let url = `http://localhost:8080/post/${id}`;
        let url = `https://mern-app-blog-ver01.onrender.com/post/${id}`;

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this blog!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const authAxios = EmbedJWTToken(url);
                    authAxios.delete(url).
                        then((res) => {
                            if (res.status === 200) {
                                getBlogsforPage();
                                getAllBlogs();
                            }
                        }).catch((err) => console.log(err))
                }
            });

    }

    // <=================== SEARCH blogs by titles ==========================>
    const handleSearch = () => {
        let filtered = "";
        if (searchStr.length > 0) {
            filtered = allbogs.filter((blg) => {
                let cur = blg.title.toLowerCase();
                if (cur.includes(searchStr.toLowerCase())) return blg;
            });
            setblogs(filtered);
        } else if (searchStr.length === 0) {
            getAllBlogs();
        }
    }
    return (
        <>
            <div className="homaMainDiv">

                <div id="searchBar">
                    <input type="search" style={{ color: 'black' }} value={searchStr} onChange={(e) => setsearchStr(e.target.value)} placeholder="Search Blog" /> <button onClick={handleSearch} >Search</button>
                </div>
                {
                    loading ? <ProgresSkelton /> :
                        error ? <h1>No Post yet or Something Went Wrong</h1> :
                            <table className="blogsTable">
                                <thead>
                                    <th>Title</th>
                                    <th>Links</th>
                                    <th>Edit Blog</th>
                                    <th>Remove Blog</th>
                                </thead>
                                <tbody>
                                    {
                                        blogs.map((blog) => {
                                            return (
                                                <tr key={blog._id}>
                                                    <td>{blog.title}</td>
                                                    <td className="Links"><Link to={`/post/${blog._id}`} state={{ pathFrom: "dashboard" }} >See Blog</Link></td>
                                                    <td className="Links"><Link to={`/post/edit/${blog._id}`} state={{ pathFrom: "dashboard" }}>Edit Blog</Link></td>
                                                    <td>
                                                        <button className="deleteBtn" onClick={() => handleDelete(blog._id)}>Delete</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                }

                <div >
                    <button className="pagebtns" disabled={page == 1 || page == 0 ? true : false} onClick={() => setPage((prev) => prev - 1)} style={page == 1 || page == 0 ? { backgroundColor: "grey" } : { backgroundColor: "white" }}>Prev</button>
                    <span>{page} of {Math.ceil(totalCount / 6)}</span>
                    <button className="pagebtns" disabled={page == Math.ceil(totalCount / 6) || blogs.length == 0 ? true : false} onClick={() => setPage((prev) => prev + 1)} style={page == Math.ceil(totalCount / 6) || blogs.length == 0 ? { backgroundColor: "grey" } : { backgroundColor: "white" }}>Next</button>
                </div>
            </div>
        </>
    );
}