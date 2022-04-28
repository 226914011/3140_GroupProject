import { Navigate } from "react-router-dom";
import React, {useState} from "react";
import "./404.css";
export default function NotFoundPage(){

    const [redirectNow, setRedirectNow] = useState(false);
    setTimeout(() => setRedirectNow(true), 4500);

    return redirectNow ? (
        <Navigate to="/" replace/>
      ) : (
        <div className="NotFound">
        <p className="number">404</p>
        <h2>
            抱歉，所請求的網站鏈接不正確。
        </h2>
        <h3>
            你將在5秒內被重新導向至首頁。
        </h3>
        </div>
    )
}