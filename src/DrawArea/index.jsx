import React, { useState } from "react";
import { Space, InputNumber, Button, Divider } from 'antd';
import CanvasPanel from "./components/CanvasPanel";
import ExtraInfo from "./components/ExtraInfo";
import QuickAction from "./components/QuickAction";
import RecordCache from "./components/RecordCache";
import { ScrollSubRect, Rect } from '../utils/et_canvas_scroll_helper'
import { drawBorder, resetWrap, useInputState } from '../utils'
import './style.css'


const Canvas = () => {
    const [textInfo, setTextInfo] = useState("");
    const [rectList, setRectList] = useState([]);
    const { oldData, setOldData, newData, setNewData } = useInputState();

    const doDrawKeep = () => {
        const clipResult = ScrollSubRect(new Rect(oldData.left, oldData.top, oldData.width, oldData.height), new Rect(newData.left, newData.top, newData.width, newData.height));
        console.log('rcKeep', clipResult.rcKeep)
        const c = document.getElementById('mycanvas');
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 1000, 1000)
        drawBorder(ctx);
        ctx.lineWidth = 2;
        // 绘制当前的old区域和new区域(old gray new  black)
        ctx.strokeStyle = "gray";
        ctx.strokeRect(oldData.left, oldData.top, oldData.width, oldData.height);
        ctx.strokeStyle = "red";
        ctx.strokeRect(newData.left, newData.top, newData.width, newData.height);
        // 先绘制rcKeep下面的rcSrc和rcDest
        ctx.lineWidth = 1;
        ctx.fillStyle = "#dddddd";
        ctx.fillRect(clipResult.rcKeep.rcSrc.left + oldData.left, clipResult.rcKeep.rcSrc.top + oldData.top, clipResult.rcKeep.rcSrc.width, clipResult.rcKeep.rcSrc.height)
        ctx.fillStyle = "rgba(102, 255, 0, .3)";
        ctx.fillRect(clipResult.rcKeep.rcDest.left + oldData.left, clipResult.rcKeep.rcDest.top + oldData.top, clipResult.rcKeep.rcDest.width, clipResult.rcKeep.rcDest.height)
        
    }
    const doDrawClips = () => {
        const clipResult = ScrollSubRect(new Rect(oldData.left, oldData.top, oldData.width, oldData.height), new Rect(newData.left, newData.top, newData.width, newData.height));
        const c = document.getElementById('mycanvas');
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 1000, 1000)
        drawBorder(ctx);
        // 绘制当前的old区域和new区域(old gray new  black)
        ctx.lineWidth = 2;
        ctx.strokeStyle = "gray";
        ctx.strokeRect(oldData.left, oldData.top, oldData.width, oldData.height);
        ctx.strokeStyle = "red";
        ctx.strokeRect(newData.left, newData.top, newData.width, newData.height);
        const colorList = ["deepskyblue", "orange", 'pink', 'rgb(21, 101, 192)']
        // 绘制clips区域
        clipResult.clips.map((item, i) => {
            ctx.fillStyle = colorList[i];
            ctx.fillRect(item.left, item.top, item.width, item.height)
        })
        console.log('clips', clipResult.clips)
    }

    return <div className="main">
        <div className="left">
            <CanvasPanel />
        </div>

        <div className="right">
            <QuickAction setOldData={setOldData} setNewData={setNewData} textInfo={textInfo} rectList={rectList}
                setRectList={setRectList} setTextInfo={setTextInfo} />
            <Divider />
            <p>Old Value:</p>
            <Space>
                <div>
                    left： <InputNumber size="large" value={oldData.left} onChange={
                        (value) => {
                            setOldData({
                                left: value
                            })
                        }
                    } />
                </div>
                <div>
                    top: <InputNumber size="large" value={oldData.top} onChange={
                        (value) => {
                            setOldData({
                                top: value
                            })
                        }
                    } />
                </div>
                <div>
                    width: <InputNumber size="large" value={oldData.width} onChange={
                        (value) => {
                            setOldData({
                                width: value
                            })
                        }
                    } />
                </div>
                <div>
                    height: <InputNumber size="large" value={oldData.height} onChange={
                        (value) => {
                            setOldData({
                                height: value
                            })
                        }
                    } />
                </div>
            </Space>
            <p style={{ paddingTop: 30 }}>New Value:</p>
            <Space>
                <div>
                    left： <InputNumber size="large" value={newData.left} onChange={
                        (value) => {
                            setNewData({
                                left: value
                            })
                        }
                    } />
                </div>
                <div>
                    top: <InputNumber size="large" value={newData.top} onChange={(value) => {
                        setNewData({
                            top: value
                        })
                    }} />
                </div>
                <div>
                    width: <InputNumber size="large" value={newData.width} onChange={
                        (value) => {
                            setNewData({
                                width: value
                            })
                        }
                    } />
                </div>
                <div>
                    height: <InputNumber size="large" value={newData.height} onChange={
                        (value) => {
                            setNewData({
                                height: value
                            })
                        }
                    } />
                </div>
            </Space>
            <div style={{ marginTop: 20 }}>
                <Space>
                    <Button type="primary" onClick={doDrawKeep}>
                        查看RCKeep对象
                    </Button>
                    <Button type="default" onClick={doDrawClips}>
                        查看Clips对象
                    </Button>
                    <Button style={{ background: "orange", border: 'none' }} onClick={resetWrap}>
                        清空画布
                    </Button>
                </Space>
                <Divider />
                <div className="bottomWrapper">
                    {/* 当前记录存储 */}
                    <RecordCache setOldData={setOldData} oldData={oldData} newData={newData} setNewData={setNewData} />
                    {/* 图例内容展示 */}
                    <ExtraInfo />
                </div>
            </div>
        </div>

    </div>
}

export default Canvas;