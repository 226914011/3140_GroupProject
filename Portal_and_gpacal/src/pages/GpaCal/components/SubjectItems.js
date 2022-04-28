import { useContext, useState } from 'react'
import './InsertGpa.css'
import { GpaContext } from './SemGpaStore'
import {FaTimes} from 'react-icons/fa'


const SubjectItems = ( {subjectID}  ) => {
  const {subjectlist, setSubject} = useContext(GpaContext)


  const [click, setClick] = useState(false)
  const [credit, setCredit] = useState("")
  const [grade, setGrade] = useState("")


  

  function credChange(e) {
    let { value, min, max } = e.target;
    if (value === ""){
      setCredit("")
      let tempArray = [...subjectlist]
      tempArray[subjectID-1].credit = NaN
      setSubject(tempArray)
      return
    }
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setCredit(value)
    let tempArray = [...subjectlist]
    tempArray[subjectID-1].credit = Number(value)
    setSubject(tempArray)
  }


  function gradeChange(e) {
    let { value, min, max } = e.target;
    if (value === ""){
      setGrade("")
      let tempArray = [...subjectlist]
      tempArray[subjectID-1].grade = NaN
      setSubject(tempArray)
      return
    }
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setGrade(value)
    let tempArray = [...subjectlist]
    tempArray[subjectID-1].grade = Number(value)
    setSubject(tempArray)
  }

  function handleClick() {
    let tempArray = [...subjectlist]
    tempArray.splice(tempArray.length-2, 1)
    setSubject(tempArray)
  }




  return (
    <tr>
      <td>科目</td>
      <td><input type="number"  onWheel={(e) => e.target.blur()} min="0" max="4"  onChange={credChange} value={credit} className="cred-column"/></td>
      <td>
        <input type="number" onWheel={(e) => e.target.blur()} min="0.0" max="4.3" onChange={gradeChange} value={grade} className="grade-column"/>
      </td>
      <td>
        <div className="delete-icon" onClick={handleClick}>
          <FaTimes/>
        </div>
      </td>
    </tr>
  )
}

export default SubjectItems