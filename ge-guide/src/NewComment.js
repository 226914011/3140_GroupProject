import React from "react";
import ReactDom from "react-dom";
import { useState,useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import { Link,useParams } from "react-router-dom";
import "./NewComment.css";
import NavBar from "./Components/navBar";

export default function NewComment() {

    function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      }

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const [inputtedsubjectcode, setCode] = useState(null);
    const [inputtedlecturername, setName] = useState(null);
    const [subjectName, setSubjectName] = useState(null);
    const [commentoncourse, setCommentCourse] = useState(null);
    const [commentonlecturer, setCommentLecturer] = useState(null);
    const [rateCourse, setRateCourse] = useState(5);
    const [rateWorkload, setRateWorkload] = useState(5);
    const [rateLecturer, setRateLecturer] = useState(5);
    const [overallGrade,setOverallGrade] = useState("A+");

    const [option, setOption] = useState(["A+", "A", "A","B+","B","B-","C+","C","C-","D","W/F"])
    const Add = option.map(Add => Add)

    let params = useParams();
    useEffect(() => {

        if(params.code!==null){
            setCode(params.code)
        }
    }, []);


    const onSubmit = data => {
        const currentTime = new Date()
        // submit whole section information
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subjectCode: inputtedsubjectcode,
                id: uuidv4(),
                userID: null,
                lecturerID: inputtedlecturername,
                courseRate: rateCourse,
                workloadRate: rateWorkload,
                lecturerRate:rateLecturer,
                lecturerContent: commentonlecturer,
                courseContent: commentoncourse,
                teachingTerm: "21-22 Sem 2",
                createdTime: currentTime,
                lastUpdatedTime: currentTime,
                score : {
                    grade: overallGrade
                }
            })
        };

        fetch('http://localhost:3004/Comments', requestOptions)
            .then(response => response.json());
        alert("已儲存你的評論。多謝你的貢獻。")
    }



    const handleInputChange = (event) => {
        const value = event.name;
        // change on subject code and subject name
    }

    return (
        <div>
            <NavBar/>
            <div className="return-showing">
                <a href="https://hkcc.tk">返回Portal</a>
                <span> / </span>
                <Link to="/" className="back-to-ds-ge">返回GE/DS導覽</Link>
                <span> / 填寫新評論：</span>
            </div>
            <div className="comment-Box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className="comment-table">
                        <tbody>
                            {/* First Section of Basic Information*/}
                            <tr className="part-of-content">
                                <td className="col-1">
                                    <label htmlFor="subjectcode" >科目編號：</label>
                                </td>
                                <td>
                                    <input type="text" name="subjectcode" value={inputtedsubjectcode} onInput={e => setCode(e.target.value)} onChange={handleInputChange} {...register("requiredSubjectCode", { required: true })} />
                                </td>
                            </tr>
                            <tr >
                                {
                                /*
                                <td colspan="2" className="ignore-td">
                                     {errors.requiredSubjectCode && <span>抱歉，此項爲必填項。請務必輸入。</span>}
                                </td>
                                */
                                }
                            </tr>

                            {/* <p>
                                <label>科目名稱：</label>
                                <span>{subjectName}</span>
                            </p> */}
                            <tr className="part-of-content">
                                <td className="col-1">
                                    <label htmlFor="lecturername">授課講師：</label>
                                </td>
                                <td className="col-2">
                                    <input type="text" name="lecturername" value={inputtedlecturername} onInput={e => setName(e.target.value)} {...register("requiredLecturerName", { required: true })}></input>
                                </td>

                            </tr>
                            <tr >
                                <td colspan="2" className="ignore-td">
                                    {errors.requiredLecturerName && <span>抱歉，此項爲必填項。請務必輸入。</span>}
                                </td>
                            </tr>

                            {/* Second Section of Selection Type of comment
                            <div>
                                <label>請選擇留言種類：</label>
                                <label>評價</label>
                                <input type="checkbox" name="comment" />
                                <label>分數記錄</label>
                                <input type="checkbox" name="record" />
                            </div>
                            */}

                            <tr className="part-of-content">
                                <td className="col-1">
                                    <label htmlFor="rateCourse">科目評分：</label>
                                </td>
                                <td className="col-2">
                                    <input type="range" name="rateCourse" min="1" max="5" onChange={(event) => setRateCourse(event.target.value)} />
                                    <span>{rateCourse}</span>

                                </td>
                            </tr>
                            <tr className="part-of-content">
                                <td className="col-1">
                                    <label htmlFor="rateWorkload">工作量評分：</label>
                                </td>

                                <td className="col-2">
                                    <input type="range" name="rateWorkload" min="1" max="5" onChange={(event) => setRateWorkload(event.target.value)} />
                                    <span>{rateWorkload}</span>
                                </td>
                            </tr>
                            <tr className="part-of-content">
                                <td className="col-1">
                                    <label htmlFor="rateLecturer">講師評分：</label>
                                </td>

                                <td className="col-2">
                                    <input type="range" name="rateLecturer" min="1" max="5" onChange={(event) => setRateLecturer(event.target.value)} />
                                    <span>{rateLecturer}</span>
                                </td>

                            </tr>
                        </tbody>
                    </table>

                    <div className="row">

                        <label htmlFor="commentCourse" >課程評論：</label>
                        <textarea name="commentCourse" className="text-area" rows="3" cols="50" value={commentoncourse} onInput={e => setCommentCourse(e.target.value)} />
                    </div>

                    <div className="row">

                        <label htmlFor="commentLecturer" >講師評論：</label>
                        <textarea name="commentLecturer" className="text-area" rows="3" cols="50" value={commentonlecturer} onInput={e => setCommentLecturer(e.target.value)} />

                    </div>


                    <div className="row">
                        <div>
                            <label>總成績等級：</label>
                            < select
                                onChange={e => setOverallGrade(e.target.value)}>
                                {
                                    Add.map((address, key) => <option key={key} value={address}>{address}</option>)
                                }
                            </select >

                        </div>
                    </div>
                
                    <div className="button-wrapper">
                        <button type="submit" className="red-button">提交</button>

                    </div>
                </form>
            </div>
        </div>


    )
}