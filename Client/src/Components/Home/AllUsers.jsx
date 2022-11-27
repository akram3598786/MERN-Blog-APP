import axios from "axios";
import { useEffect, useState } from "react";

export default function AllUsers(){
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(false);
    const [users, setusers] = useState([]);

    useEffect(()=>{
        setloading(true);
        getAllUsers();
    },[])

    const getAllUsers=()=>{
        let url = "http://127.0.0.1:8080/user/";
        axios.get(url).
        
        then((res)=>setusers(res.data)).
        catch((err)=>{
            console.log(err)
            setError(true)}).
        finally((res)=>setloading(false));
    }
    return(
        <>
          <div>
            <h2>All exist Users</h2>
            {
                loading ? <h1>Loading...</h1> :
                error ? <h1>Error : Something Went Wrong</h1> :
                (
                    users.map((user)=>{
                        return (
                            <div key={user._Id}>
                                <p>{user.name}</p>
                            </div>
                        )
                    })
                )
            }

          </div>
        </>
    );
}