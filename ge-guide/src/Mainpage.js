import SearchBar from "./Components/SearchBar";
import "./Mainpage.css";
import React,{useState,useEffect} from 'react';
import NavBar from "./Components/navBar"

export default function Mainpage(){
    const [CourseData, setCourseData] = useState([]);
    const [LecturerData, setLecturerData] = useState([]);

    useEffect(() => {
        const fetchCourseData = async () => {
            // get the data from the api
            const data = await fetch('http://localhost:3004/CourseDetails');
            // convert the data to json
            const json = await data.json();
            setCourseData(json);
        }

        const fetchLecturerData = async () => {
            // get the data from the api
            const data = await fetch('http://localhost:3004/Lecturers');
            // convert the data to json
            const json = await data.json();
            setLecturerData(json);
        }

        fetchCourseData().catch(console.error);;
        fetchLecturerData().catch(console.error);;
    }, []);
  
    if (!CourseData||!LecturerData) return <div>Loading...</div>;

    return(
        <>
        <NavBar />
        <div className="mainpage">
            <div className="background-image"></div>
            <div className="searchbar_header">
                <p>HKCC DS/GE 評價查詢</p>
            </div>
            <div className='searchbar'>
                <SearchBar placeholder="請輸入課程,導師名稱或者編號:" courseData={CourseData} lecturerData={LecturerData} />
            </div>
        </div>
        </>
    )
}

