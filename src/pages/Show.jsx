import React,{useState,useEffect}from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Show() {
    const [show,setShow]=useState([]);
    const [showModal,setShowModal]=useState(false);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const params = useParams();
    const {id}=params;

    const getData=async()=>{
    const res=  await axios.get("https://api.tvmaze.com/search/shows?q=all");
    const resData=await res.data;
    const filterData=resData.filter((item)=>item.show.id==id);
    console.log(filterData)
    setShow(filterData);
    }
  const handleSubmit=(e)=>{
        e.preventDefault();
        setShowModal(false);
        if(!name || !email || !phone){
            alert("Please Fill All The Details");
            return;
        }

       const user = {
            name,
            email,
            phone
        }

        localStorage.setItem("user",JSON.stringify(user));
        
        setName("");
        setEmail("");
        setPhone("");
        setTimeout(() => {
            alert("Your Ticket Has Been Booked Successfully");
        }, 500);

    }

    useEffect(() => {
        getData();
      
    }, [id])
    return(
        <div className="container-fluid main">
            <div className="card show">
        <img src={show[0]?.show.image?.original} className="card-img-top" alt={show[0]?.show.name}/>
        <div className="card-body">
          <h1 className="card-title">{show[0]?.show.name}</h1>
            <p dangerouslySetInnerHTML={{__html:show[0]?.show.summary}}></p>
            <div className="rating">
                <h5>Rating</h5>
                {(show[0]?.show.rating.average ?(
                    <>
                <p>{show[0]?.show.rating.average}</p>
                <span className="stars">
                    {show[0]?.show.rating.average>=1?<i className="fa fa-star"></i>:<i className="fa-solid fa-star-half-stroke"></i>}
                    {show[0]?.show.rating.average>=2?<i className="fa fa-star"></i>:<i className="fa-solid fa-star-half-stroke"></i>}
                    {show[0]?.show.rating.average>=3?<i className="fa fa-star"></i>:<i className="fa-solid fa-star-half-stroke"></i>}
                    {show[0]?.show.rating.average>=4?<i className="fa fa-star"></i>:<i className="fa-solid fa-star-half-stroke"></i>}
                    {show[0]?.show.rating.average>=5?<i className="fa fa-star"></i>:<i className="fa-solid fa-star-half-stroke"></i>}
                    {show[0]?.show.rating.average>=6?<i className="fa fa-star"></i>:<i className="fa-solid fa-star-half-stroke"></i>}
                    {show[0]?.show.rating.average>=7?<i className="fa fa-star"></i>:<i className="fa-solid fa-star-half-stroke"></i>}
                    {show[0]?.show.rating.average>=8?<i className="fa fa-star"></i>:<i className="fa-solid fa-star-half-stroke"></i>}
                    {show[0]?.show.rating.average>=9?<i className="fa fa-star"></i>:<i className="fa-solid fa-star-half-stroke"></i>}
                    {show[0]?.show.rating.average>=10?<i className="fa fa-star"></i>:<i className="fa-solid fa-star-half-stroke"></i>}
                </span>
                </>
                )
                :<p>Not Rated</p>)}

            </div>
            <div className="status">
                <h5>Status</h5>
                <p>{show[0]?.show.status}</p>
            </div>
            <div className="genres">
                <h5>Genres</h5>
                <ul>
                    {show[0]?.show.genres.map((item)=>(
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="language">
                <h5>Language</h5>
                <p>{show[0]?.show.language}</p>
            </div>
            <div className="type">
                <h5>Type</h5>
                <p>{show[0]?.show.type}</p>

            </div>
            <div className="buttons">
         <a href={show[0]?.show.officialSite} className="btn btn-primary" target="_blank">Official Site</a>
                <a href={show[0]?.show.url} className="btn btn-primary" target="_blank">More Info</a>
                <button className="btn btn-primary"
                onClick={()=>
                {
                    setShowModal(true);
                }}
                >
                    Book Tickets
                </button>
                </div>
         </div>
            </div>
            {showModal && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={()=>setShowModal(false)}><i className="fas fa-times-circle"></i></span>
                    <h3>Book Tickets</h3>
                    <hr/>
                    <h5>Fill the form to book tickets</h5>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" placeholder="Enter Your Name" className="form-control" id="name" required onChange={
                                (e)=>{
                                    setName(e.target.value);
                                }
                            }/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Your Email" className="form-control" id="email" required
                            onChange={
                                (e)=>{
                                    setEmail(e.target.value);
                                }
                            }
                            />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="number" placeholder="Enter Your Phone Number" className="form-control" id="phone" required
                                onChange={
                                    (e)=>{
                                        setPhone(e.target.value);
                                    }
                                }
                                />
                                </div>
                            </form>
                            <button className="btn btn-primary mt-2"
                            onClick={handleSubmit
                            }
                            >Submit</button>
            </div>
            </div>
            )}
            <style jsx>{`
            .main{
                display: flex;
                justify-content: center;
                align-items: center;
                height: max-content;
            }
            .show{
                display: flex;
                flex-direction: row;
                width: 100vw;
                height: max-content;
                box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
                margin: 10px;
                
            }
            .card-img-top{
                padding: 5px;
                height:  95vh;
                width: 40vw;
                border-radius: 10px;
                align-self: center;
            }
            .card-img-top:hover{
                transform: scale(1.01);
                
            }
            .card-body{
                width: 60vw;
                padding: 10px;

            }
           .genres ul{
                padding: 0px;
            }

            .genres ul li{
                display: inline-block;
                list-style: none;
                margin: 5px;
                padding: 5px;
                border-radius: 5px;
                background-color: #f1f1f1;

            }
            .language{
                margin-top: 1px;
            }
            .language p{
                display: inline-block;
                padding: 5px;
                border-radius: 5px;
                background-color: #f1f1f1;
            }
            .type{
                margin-top: 1px;
            }
            .type p{
                display: inline-block;
                padding: 5px;
                border-radius: 5px;
                background-color: #f1f1f1;
            }
            .buttons{
                margin-top: 1px;
            }
            .buttons a{
                margin-right: 10px;
            }

            .rating{
                margin-top: 1px;
            }
            .rating p{
                display: inline-block;
                padding: 5px;
                border-radius: 5px;
                background-color: #f1f1f1;
            }
            .rating .stars{
                margin-left: 10px;
            }
            .rating .stars i{
                color: #f1c40f;
            }
            .status{
                margin-top: 1px;
            }
            .status p{
                display: inline-block;
                padding: 5px;
                border-radius: 5px;
                background-color: #f1f1f1;
            }
            .modal{
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0,0,0,0.7);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .modal-content{
                width: 50vw;
                height: 50vh;
                background-color: white;
                border-radius: 10px;
                display: flex;
                padding: 10px;
                align-items: center;
                position: relative;
                
            }
            .close{
                position: absolute;
                top: -6%;
                right: -1%;
                font-size: 40px;
                cursor: pointer;

            }
            .close i{
                color: red;
            }

            @media(max-width: 768px){
                .main{
                height: max-content;
                padding: 10px;
                }
                .show{
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .card-img-top{
                    width: 90vw;
                    height: 60vh;
                }
                .card-body{
                    width: 90vw;
                }
                .modal-content{
                    width: 90vw;
                    height: max-content;
                }
            }
            `}</style>
        </div>

    )
}