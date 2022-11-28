import { useParams } from "react-router-dom"


export default function BlogDetails(){

    const {blogId} = useParams();
    console.log(blogId);
    return (
        <>
        <h1>Blog</h1>
        
        </>
    )
}