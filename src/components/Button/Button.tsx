import React from "react";
import "./style.css";

const button = () => {
    window.location.reload();
}

const Button: React.FC = () => {
    return (
        <button onClick={button} id="button">Restart</button>
    );
}

export default Button;