import axios , { AxiosPromise } from "axios";
import { useState , useEffect } from "react";

const useFetch = async (url : string) => {
     const [data,setData] = useState(null);

     const fetchData = async (url : string) => {
        const data = await axios.get(`${url}`);
        console.log(data);
     }

     useEffect(() => {
        fetchData(url);
     },[url])

     return [data,setData];
}

export default useFetch;
