import { useState } from 'react'
import './InsertGpa.css'
import SubjectItems from './SubjectItems'
import {GpaContext} from './SemGpaStore'

const InsertGpa = () =>{
  //declare variable
  const [subjectlist, setSubject] = useState(
    [
      {
        'id': 1,
        'credit': 0,
        'grade': 0
      },
      {
        'id': 2,
        'credit': 0,
        'grade': 0
      },
      {
        'id': 3,
        'credit': 0,
        'grade': 0
      },
      {
        'id': 4,
        'credit': 0,
        'grade': 0
      },
      {
        'id': 5,
        'credit': 0,
        'grade': 0
      },
    ]
  )

  const [tarGpaInput, settarGpaInput] = useState({
    'currentGpa': '',
    'studiedCred': '',
    'tarCgpa': '',
    'remainCred': ''
  })



  // click to add new subject
  function plus() {
    setSubject(function (prevSubList) {
      return [...prevSubList, {
        'id': prevSubList.length+1,
        'credit': 0,
        'grade': 0
      }
    ]})
  }

  // print element in subjectlist
  const listItems = subjectlist.map((subject) =>
    <SubjectItems key={subject.id} subjectID ={subject.id}/>
  )

  function calGpa() {
    let total = 0
    let sumCred = 0
    for (const i of subjectlist) {
      total+= i.credit*i.grade
      sumCred+= i.credit
    }
    let result = total/sumCred
    if (subjectlist == 0){
      alert("請最少輸入一個科目")
    }
    else if (isNaN(result) || result == undefined) {
      alert("請輸入數字")
    }
    else{
      alert(Math.round(result * 100) / 100)
    }
  }

  //target gpa block
  function tarGpaChange(e) {
    let { value, min, max, name } = e.target;

    if (value === ""){
      settarGpaInput("")
      let tempArray = {...subjectlist}
      tempArray[name] = NaN
      return
    }

    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    let tempArray = {...tarGpaInput}
    tempArray[name] = value
    settarGpaInput(tempArray)

  }

  function calTargpa(){
    const calCurrGpa = Number(tarGpaInput.currentGpa)
    const calStudiedCred = Number(tarGpaInput.studiedCred)
    const calTarCgpa= Number(tarGpaInput.tarCgpa)
    const calRemainCred = Number(tarGpaInput.remainCred)

    let displayResult = (calTarCgpa*(calRemainCred+calStudiedCred)-(calCurrGpa*calStudiedCred))/calRemainCred
    if (isNaN(displayResult) || displayResult == undefined) {
      alert("請輸入數字")
    }
    else{
      alert(Math.round(displayResult * 100) / 100)
    }
  }

  function numKeylimit(event){
    return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'
  }

  return (
    <GpaContext.Provider value={{subjectlist, setSubject}}>
        <div className="gpa-cal-container">
          <div className="wrapper-content">
            <div id="content-layout">
              <div id="gpa-cal-container">
                <div className="wrapper-content">
                  <div id="content-layout">
                    <div id="semster-gpa-container">
                      <h2>學期(Semster) GPA 計算</h2>
                      <div className="gpa-box" id="sem-gpa-box">
                        <table className="input-table" id="gpa-cal-table">
                          <thead>
                            <tr>
                              <th width="20%"></th>
                              <th width="40%">學分 (Credit)</th>
                              <th width="40%">等級 (Grade)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listItems}
                          </tbody>
                        </table>

                        <div className='button-list-wrapper'>
                          <ul className="button-list">
                            <li>
                              <button className="red-button" onClick={plus}>新增科目</button>
                            </li>
                            <li>
                              <button className="white-button" onClick={calGpa}>計算</button>
                            </li>
                          </ul>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="target-gpa-container">
                <h2>目標 CGPA 計算</h2>
                <div className="gpa-box" id="target-gpa-box">
                  <table className="input-table" id="target-gpa-table">
                    <tbody>
                      <tr>
                        <td width="40%">現時CGPA</td>
                        <td width="60%" className="input-row"><input type="number" name="currentGpa" onWheel={(e) => e.target.blur()} min="0" max="4.3" onkeydown={numKeylimit} onChange={tarGpaChange} value={tarGpaInput.currentGpa} className="tar-column"/></td>
                      </tr>
                      <tr>
                        <td>已修讀學分 (Credit)</td>
                        <td className="input-row"><input type="number" name="studiedCred"  onWheel={(e) => e.target.blur()} min="0" max="100" onkeydown={numKeylimit} onChange={tarGpaChange} value={tarGpaInput.studiedCred} className="tar-column"/></td>
                      </tr>
                      <tr>
                        <td>目標CGPA</td>
                        <td className="input-row"><input type="number" name="tarCgpa" onWheel={(e) => e.target.blur()} min="0" max="4.3" onkeydown={numKeylimit} onChange={tarGpaChange} value={tarGpaInput.tarCgpa} className="tar-column"/></td>
                      </tr>
                      <tr>
                        <td>餘下學分 (Credit)</td>
                        <td className="input-row"><input type="number" name="remainCred" onWheel={(e) => e.target.blur()} min="0" max="100" onkeydown={numKeylimit} onChange={tarGpaChange} value={tarGpaInput.remainCred} className="tar-column"/></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="tar-cal-button-area">
                    <button className="white-button" onClick={calTargpa} >計算</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </GpaContext.Provider>
  )
}

export default InsertGpa;