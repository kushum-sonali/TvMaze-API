import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

  function Home() {
    const [data, setData] = useState([]);
    const getData=async()=>{
    const res=  await axios.get("https://api.tvmaze.com/search/shows?q=all");
    const resData=await res.data;
      setData(resData);
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="container-fluid  d-flex main">
         {data.map((item) => (
        <div className="card"  key={item.show.id}>
        <img src={item.show.image?.medium} className="card-img-top" alt={item.show.name}/>
        <div className="card-body">
          <h5 className="card-title">{item.show.name}</h5>
    
          <Link to={`/show/${item.show.id}/${item.show.name}`}><button className="btn btn-primary">Watch</button> </Link>
        </div>
      </div>
        ))}
         <style jsx>{`
            .main{
                flex-wrap: wrap;
                justify-content: space-around;
            }
            .card{
                width: 18rem;
                margin-bottom: 10px;
                margin-top: 10px;
            }
            .card-img-top{
                height: 400px;
            }
            `}</style>
        </div>

    );
}

export default Home;
