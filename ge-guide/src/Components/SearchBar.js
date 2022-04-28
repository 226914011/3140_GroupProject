import React, { useState } from "react";
import {Link} from "react-router-dom";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function SearchBar({ placeholder, courseData, lecturerData }) {
  const [courseFilteredData, setCourseFilteredData] = useState([]);
  const [lecturerFilteredData, setLecturerFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    
    const newCourseFilter = Object.values(courseData).filter((value) => {
      return (value.subjectCode.toLowerCase().includes(searchWord.toLowerCase())) || (value.subjectName.toLowerCase().includes(searchWord.toLowerCase()));
    });

    const newLecturerFilter = Object.values(lecturerData).filter((value) => {
      return (value.Name.toLowerCase().includes(searchWord.toLowerCase()));
    });

    if (searchWord === "") {
      setCourseFilteredData([]);
      setLecturerFilteredData([]);
    } else {
      setCourseFilteredData(newCourseFilter);
      setLecturerFilteredData(newLecturerFilter);
    }
  };

  const clearInput = () => {
    setCourseFilteredData([]);
    setLecturerFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {(wordEntered.length === 0) ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {courseFilteredData.length !== 0 && (
        <div className="dataResult">
          <p className="dataCategory">課程:</p>
          {courseFilteredData.slice(0, 5).map((value, key) => {
            return (
              <a className="dataItem" href={("./course/".concat(value.subjectCode))} target="_self">
                <p>{value.subjectCode+" "+value.subjectName} </p>
              </a>
            );
          })}
        </div>
      )}
      {lecturerFilteredData.length !== 0 && (
        <div className="dataResult">
          <p className="dataCategory">導師:</p>
          {lecturerFilteredData.slice(0, 4).map((value, key) => {
            return (
              <a className="dataItem" href="./lecturer/" target="_self">
                <p>{value.Name} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
