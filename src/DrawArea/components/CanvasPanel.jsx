import React from "react";
import { useEffect } from "react";

const CanvasPanel = () => {

    useEffect(() => {
        var c = document.getElementById('mycanvas');
        var ctx = c.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = 'blue'; 
        ctx.lineWidth = 1;              
        ctx.lineJoin = 'round';     
        ctx.moveTo(0, 0);
        ctx.lineTo(900, 0); 
        ctx.lineTo(900, 900);
        ctx.lineTo(0, 900);  
        ctx.lineTo(0, 0);  
        ctx.stroke();
    }, [])
    
    return <>
        <canvas id='mycanvas' width="900" height="900">
            Your browser does not support the canvas element.
        </canvas>
    </>
}

export default CanvasPanel;