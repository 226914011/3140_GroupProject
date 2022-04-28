import React from "react";
import {Routes,Route, BrowserRouter,Navigate} from 'react-router-dom';
import Department from "./Department";
import CourseCatagory from "./CourseCatagory";
import CourseDetail from "./CourseDetail";
import Lecturer from "./Lecturer";
import NotFoundPage from "./404";
import Mainpage from "./Mainpage";
import NewComment from "./NewComment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage/>}/>

        <Route path="/department" element={<Department/>}>
          <Route path=":name" element={<Department/>}/>
        </Route>

        <Route path="/lecturer" element={<Lecturer/>}>
          <Route path=":id" element={<Lecturer/>}/>
        </Route>

        <Route path="/catagory" element={<CourseCatagory/>}>
          <Route path=":type" element={<CourseCatagory/>}/>
        </Route>

        <Route path="/course" element={<CourseDetail/>}>
          <Route path=":code" element={<CourseDetail/>}/>
        </Route>

        <Route path="/commentform" element={<NewComment/>} >
          <Route path=":code" element={<NewComment/>}/>
        </Route>

        <Route path="/404" element={<NotFoundPage/>}/>
        <Route path="*" element={<Navigate replace to="/404" />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
