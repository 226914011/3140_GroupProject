import React, { Component, useState, useEffect } from "react";
import { useParams, Link, Navigate,useNavigate } from "react-router-dom";
import "./CourseDetail.css";
import CommentSection from "./Components/CommentSection";
import OverallStatisticCourse from "./Components/OverallStatisticCourse";
import { Button } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import NavBar from "./Components/navBar";
import { styled } from '@mui/material/styles';

export default function CourseDetail() {
    let params = useParams();
    let catagoryPath = "/catagory/";
    const [CourseData, setCourseData] = useState([]);
    const [isDataLoading, setIsDataLoaded] = useState(true);

    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        padding: theme.spacing(1),
    }));

    useEffect(() => {
        const fetchCourseData = async () => {
            // get the data from the api
            const data = await fetch('http://localhost:3004/CourseDetails');
            // convert the data to json
            const json = await data.json();
            setCourseData(json);
            setIsDataLoaded(false);
        }
        fetchCourseData().catch(console.error);;
    }, []);
    let currentCourse = CourseData.find(course => course.subjectCode === params.code);

    function ShowGEorDS(props) {
        if (currentCourse.type === "DS") {
            return (<Div><span>科目類別：</span><span>專業教育（DS）</span></Div>);
        } else {
            return (<><Div><span>學科範疇：</span><span>Cluster <Link to={catagoryPath.concat(currentCourse.type)}>{currentCourse.type}</Link></span></Div><Div><span>科目類別：</span><span>通識教育（GE）</span></Div></>);
        }
    }
    let navigate = useNavigate();
    const routeChange = () => {
        navigate(currentCourse.SDFUrl);
    }

    function ShowDetail(props) {
        if (typeof (currentCourse) !== 'undefined' && currentCourse !== null) {
            return (
            <div>
                <NavBar/>
            <div className="courseDetail">
                <div className="bread">
                    <a href="https://hkcc.tk">返回Portal</a>
                    <span> / </span>
                    <Link to="/">返回GE/DS導覽</Link>
                    <span> / {currentCourse.subjectCode}:</span>
                </div>
                <div className="course">
                    <div className="header">
                        <p className="title">{currentCourse.subjectCode}</p>
                        <p className="title">{currentCourse.subjectName}</p>
                        <a href={currentCourse.SDFUrl}>
                        <Button variant="outlined" startIcon={<BookIcon />}>
                            科目大綱
                        </Button>
                        </a>
                    </div>

                    <div className="leftBar">
                        <ShowGEorDS />
                        <Div><span>學分(Credits)：</span><span>{currentCourse.credit}</span></Div>
                    </div>
                </div>
                <div className="stat">
                <OverallStatisticCourse code={currentCourse.subjectCode} />
                </div>
                <div className="comment">
                <CommentSection code={params.code} />
                </div>
            </div>
            </div>);
        } else {
            return (<Navigate replace to="/404" />);
        }
    }


    return (
        isDataLoading ? <div><p>數據加載中</p></div> : <ShowDetail />
    )

}