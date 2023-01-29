import EmbedJWTToken from "../EmbedToRequest/EmbedJWTToken";
import getLoggedUser from "./GetLoggedUser";
import swal from 'sweetalert';

// Add blog into bookmarks
const BookmarkBlog = async (postId) => {
 
     const loggedUser = getLoggedUser();
    let payload = {
        bookmarkBy: loggedUser._id,
        postId: postId
    }
  // let url = `http://localhost:8080/publish/bookmark`;
    let url = `https://mern-app-blog-ver01.onrender.com/publish/bookmark`;

    const authAxios = EmbedJWTToken(url);
    authAxios.patch(url, payload).
        then((res) => {
            if (res.status === 201) { 
                // return loggedUser
            }
            // else swal("Something wrong !");
        }).catch((err) => {
            console.log(err);
        })
}

// Remove blog from bookmarks
const RemoveBookmarkBlog = async (postId) => {
    const loggedUser = getLoggedUser();
    let payload = {
        bookmarkBy: loggedUser._id,
        postId: postId
    }
    //  let url = `http://localhost:8080/publish/remove`;
    let url = `https://mern-app-blog-ver01.onrender.com/publish/remove`;

    const authAxios = EmbedJWTToken(url);
    authAxios.patch(url, payload).
        then((res) => {
            if (res.status === 200) {
            }
            // else swal("Something wrong !");
        }).catch((err) => {
            console.log(err);
        })
}

export {BookmarkBlog,RemoveBookmarkBlog};