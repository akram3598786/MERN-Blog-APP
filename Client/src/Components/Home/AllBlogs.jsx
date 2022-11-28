import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Homepage.style.css";

export default function AllBlogs() {
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(false);
    const [blogs, setblogs] = useState([]);

    useEffect(() => {
        setloading(true);
        getAllBlogs();
    }, [])

    const getAllBlogs = () => {
        let userData = JSON.parse(localStorage.getItem("LoggedUser"));
        console.log(userData._id);
        let url = `http://127.0.0.1:8080/post/${userData._id}/all`;
        axios.get(url).

            then((res) => {
                console.log(res.data)
                setblogs(res.data)
            }).
            catch((err) => {
                console.log(err)
                setError(true)
            }).
            finally((res) => setloading(false));
    }
    return (
        <>
            <div>
                <h2>All exist Users</h2>
                {
                    loading ? <h1>Loading...</h1> :
                        error ? <h1>Error : Something Went Wrong</h1> :

                            <table className="blogsTable">
                                <thead>
                                    <th>Title</th>
                                    <th>Links</th>
                                </thead>
                                <tbody>
                                    {
                                        blogs.map((blog)=>{
                                            return (
                                                <tr key={blog._id}>
                                                    <td>{blog.title}</td>
                                                    <td><Link to={`/post/${blog._id}`}>See Blog</Link></td>
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