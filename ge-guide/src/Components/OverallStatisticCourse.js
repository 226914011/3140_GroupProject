import React,{useState,useEffect} from 'react';
import {Chart as ChartJS,    CategoryScale,    LinearScale,    BarElement,    Title,    Tooltip,    Legend,  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "./OverallStatisticCourse.css"


ChartJS.register(CategoryScale, LinearScale, BarElement, Title,Tooltip,Legend);

export default function OverallStatisticCourse({ code }) {
    const [CommentData, setCommentData] = useState([]);
    useEffect(() => {
        const fetchCommentData = async () => {
            // get the data from the api
            const data = await fetch('http://localhost:3004/Comments');
            // convert the data to json
            const json = await data.json();
            setCommentData(json);
        }
        fetchCommentData().catch(console.error);;
    }, []);
    const statisticOnCrrentCourse = CommentData.find(comment => comment.subjectCode === code);
    
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '成績分佈',
            },
        },
    };

    const labels = ['A Range', 'B Range', 'C/D Range或W/F'];
    const data = {
        labels,
        datasets: [
            {
                label: '2021 Sem 1',
                data: [3,2,3,1],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: '2122 Sem 1',
                data: [2,5,4,1],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };



    return (
        <div className='barchart'>
            <Bar options={options} data={data} />
        </div>
    )
};