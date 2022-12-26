import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Homepage.style.css";

export default function AllBlogs() {
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(false);
    const [searchStr, setsearchStr] = useState("");
    const [blogs, setblogs] = useState([]);
    let [nofound, setnotfound] = useState(false);
    let token = localStorage.getItem("token");

    useEffect(() => {
        setloading(true);
        getAllBlogs();
    }, [])

    const getAllBlogs = () => {
        let userData = JSON.parse(localStorage.getItem("LoggedUser"));
        
        let url = `http://localhost:8080/post/${userData._id}/all`;
        // let url = `https://mern-app-blog-ver01.onrender.com/post/${userData._id}/all`; 
        const authAxios = axios.create({
            baseURL : url,
            headers :{
                Authorization : `Bearer ${token}`,
            }
        });
        authAxios.get(url).
            then((res) => {
                // console.log(res.data)
                setblogs(res.data);
            }).
            catch((err) => {
                console.log(err)
                setError(true)
            }).
            finally((res) => setloading(false));
    }

    const handleDelete = (id) => {

        let url = `http://localhost:8080/post/${id}`;
        // let url = `https://mern-app-blog-ver01.onrender.com/post/${id}`;
        const authAxios = axios.create({
            baseURL : url,
            headers :{
                Authorization : `Bearer ${token}`,
            }
        });
        authAxios.delete(url).
            then((res) => {
                // console.log(res)
                if (res.status === 200) {
                    alert("Blog deleted");
                    getAllBlogs();
                }

            }).catch((err) => console.log(err));
    }

    const handleSearch = () => {
        let filtered = "";
        if (searchStr.length > 0) {
            filtered = blogs.filter((blg) => {
                let cur = blg.title.toLowerCase();
                //   console.log(searchStr.toLowerCase())
                if (cur.includes(searchStr.toLowerCase())) return blg;
            });
        } else {
            getAllBlogs();
        }
        if (filtered.length === 0) getAllBlogs();
        setblogs(filtered);
    }
    return (
        <>
            <div>
                <h2>All Exist Blogs</h2>

                <div id="searchBar">
                    <input type="search" value={searchStr} onChange={(e) => setsearchStr(e.target.value)} placeholder="Search Blog" /> <button onClick={handleSearch} >Search</button>
                </div>
                {
                    loading ? <h1>Loading...</h1> :
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
                                                    <td className="Links"><Link to={`/post/${blog._id}`}>See Blog</Link></td>
                                                    <td className="Links"><Link to={`/post/edit/${blog._id}`}>Edit Blog</Link></td>
                                                    <td><button className="deleteBtn" onClick={() => handleDelete(blog._id)}>Remove</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                }
            </div>
        </>
    );
}