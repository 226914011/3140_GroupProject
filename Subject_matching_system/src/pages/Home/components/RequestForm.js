import React, {useState} from "react";
import './RequestForm.css'

const RequestForm = () => {     //create a request form

    const [val, setEnteredText] = useState();

    const handleSubmit = (e) =>{     //when submit button clicked, all value inputted will change to JSON format

        e.preventDefault()
        let {value: SubjectRelease} = document.getElementById("subjectRelease");
        let {value: LectureGroupRelease} = document.getElementById("lectureGroupRelease");
        let {value: SubjectWanted} = document.getElementById("subjectWanted");
        let {value: LectureGroupWanted} = document.getElementById("lectureGroupWanted")
        const request = {SubjectRelease : SubjectRelease, LectureGroupRelease : LectureGroupRelease,
            SubjectWanted : SubjectWanted, LectureGroupWanted : LectureGroupWanted };

        const requestJson = JSON.stringify(request);        //change string type into JSON format

        console.log(requestJson);
        setEnteredText('');
        alert("Success!");
    }
    // a form for user to input the data

    return (
        <div className="request-wrapper">
            <form className="requestFormBox" name = {"requestForm"} onSubmit={handleSubmit}>

                <h1>Subject Matching Request Form</h1>

                {/* <p>Subject Code that you want to release</p> */}
                <input type={"text"} placeholder="Original Subject Code" value={val} id={"subjectRelease"}/>

                {/* <p>Lecture Group of the subject you want to release</p> */}
                <input type={"text"} placeholder='Original Lecture Group' value={val} id={"lectureGroupRelease"}/>

                {/* <p>Subject Code that you want to get</p> */}
                <input type={"text"} placeholder="Target Subject Code" value={val} id={"subjectWanted"}/>

                {/* <p>Lecture Group of the subject you want to get</p> */}
                <input type={"text"} placeholder="Target Lecture Group" value={val} id={"lectureGroupWanted"}/>

                <p><button id="red-button">Submit</button></p>
            </form>
        </div>

    )
}

export default RequestForm;