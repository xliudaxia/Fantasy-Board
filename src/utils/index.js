import { useSetState } from "ahooks";


export const drawBorder = (ctx) => {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.moveTo(0, 0);
    ctx.lineTo(900, 0);
    ctx.lineTo(900, 900);
    ctx.lineTo(0, 900);
    ctx.lineTo(0, 0);
    ctx.stroke();
}


export const resetWrap = () => {
    const c = document.getElementById('mycanvas');
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 1000, 1000)
    drawBorder(ctx);
}


export const generateLabel = (index) => {
    if (index <= 6) {
        return "垂直方向移动"
    }
    if (index > 6 && index <= 12) {
        return "横向移动"
    }
    if (index > 12 && index <= 19) {
        return "右上角区域，新区域保持不变"
    }
    if (index > 19 && index <= 26) {
        return "右下角区域，老区域保持不变"
    }
    if (index > 26 && index <= 32) {
        return "由内到外"
    }
    if (index > 32 && index <= 36) {
        return "由外到内"
    }

}


export const useInputState=()=>{
    const [oldData, setOldData] = useSetState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    });
    const [newData, setNewData] = useSetState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    });
    const updateInputData = (target)=>{
        setOldData({...target[0]})
        setNewData({...target[1]})
    }

    return {
        oldData,
        newData,
        setOldData,
        setNewData,
        updateInputData,
    }
}