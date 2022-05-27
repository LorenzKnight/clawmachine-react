import React, { useState, useEffect } from "react";
function Wrap() {
    const [pizza, setPizza] = useState(false)
  
    const px = (px) => px+"px"
    if (window.screen.width <= 768) {
        var d = 215;
        var x = 115;
        var currentX = 115;
    }
    else if (window.screen.width >= 768 && window.screen.width <= 1024){
        var d = 650;
        var x = 315;
        var currentX = 315;
    }
    else if (window.screen.width >= 1024){
        var d = 585;
        var x = 300;
        var currentX = 300;
    }
    
    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
        document.addEventListener('keyup', detectKeyUp, true)
    }, [])

    const detectKeyDown = (e) => {
        var pendulum  = document.getElementById('claws');
        var clawbase = document.getElementById('claw-base');
        var clawsarms = document.getElementById('claw-arms');
        var clawleft = document.getElementById('claw-left');
        var clawright = document.getElementById('claw-right');

        // console.log("Clicked key: ", e.key)
        
        if (e.key === "ArrowRight" && x < d) {
            x +=20;
            clawsarms.classList.remove("moveLeft");
            clawsarms.classList.add("moveRight");
        }
        else if (e.key === "ArrowLeft" && x > 0) {
            x -=20;
            clawsarms.classList.remove("moveRight");
            clawsarms.classList.add("moveLeft");
        }
        else if (e.key == " ") {
            setTimeout(() => {
                clawbase.classList.add("down");
            }, 400)
            setTimeout(() => {
                clawbase.classList.add("up");
                clawleft.classList.add("claw-left-closed");
                clawright.classList.add("claw-right-closed");
                setPizza(true);
            }, 2000)
        }
        else if (e.key == "Escape" || e.key == "Enter") {
            setPizza(false)
            clawbase.classList.remove("down");
            clawbase.classList.remove("up");
            clawleft.classList.remove("claw-left-closed");
            clawright.classList.remove("claw-right-closed");
            clawsarms.classList.remove("moveLeft");
            clawsarms.classList.remove("moveRight");
            x = currentX;
        }
        pendulum.style.left = px(x);
    }

    const detectKeyUp = (e) => {
        var clawsarms = document.getElementById('claw-arms');
        if (e.key === "ArrowRight" && x < 600) {
            clawsarms.classList.add("releaseMoveRight");
            clawsarms.classList.remove("moveRight");
            clawsarms.classList.remove("releaseMoveLeft");
            setTimeout(() => {
                clawsarms.classList.remove("releaseMoveRight")
            }, 500)
        }
        else if (e.key === "ArrowLeft" && x > 0) {
            clawsarms.classList.add("releaseMoveLeft");
            clawsarms.classList.remove("moveLeft");
            clawsarms.classList.remove("releaseMoveRight");
            setTimeout(() => {
                clawsarms.classList.remove("releaseMoveLeft")
            }, 500)
        }
    }

    function handleClick () {
        var clawarms = document.getElementById('claw-base');
        var clawleft = document.getElementById('claw-left');
        var clawright = document.getElementById('claw-right');

        setTimeout(() => {
            clawarms.classList.add("down");
        }, 400)
        setTimeout(() => {
            clawarms.classList.add("up");
            clawleft.classList.add("claw-left-closed");
            clawright.classList.add("claw-right-closed");
            setPizza(true);
        }, 2000)
    }
    return (
        <div className="scene"  onClick={ handleClick }>
            <div id="claws">
                <div className="claw-base" id="claw-base"></div>
                <div className="claw-arms" id="claw-arms">
                    <div className="claw-left" id="claw-left"></div>
                    <div className={`${pizza ? "single-pizza": "hidden"}`} ></div>
                    <div className="claw-right" id="claw-right"></div>
                </div>
            </div>
            <div className="pizza-pile"></div>
            <div className="table-top"></div>
        </div>
    )
}

export default Wrap;