import React, { useEffect, useState } from 'react';
import { Space, Button, Input } from 'antd';
import { generateLabel, useInputState } from '../../utils';
const { TextArea } = Input;


const QuickAction = (props) => {
    const { rectList, setRectList, setOldData, setNewData } = props;
    const [index, setIndex] = useState(0); // 从第一个位置开始向下走
    //  TODO 为什么自定义hook不好用
    const { updateInputData } = useInputState();

    const generateRectList = () => {
        // 目标区域定死
        let middleData = "";
        const nums = [50, 100, 120, 150, 200, 230]
        nums.map(item => {
            middleData = middleData + (`new Rect(100, 100, 100, 100),new Rect(100, 0, 100, ${item})]`);
        })
        // 横向数据
        nums.map(item => {
            middleData = middleData + (`new Rect(100, 100, 100, 100),new Rect(0, 100, ${item}, 100)]`);
        })

        // 右上角区域，新区域保持不变 7
        const nums1 = [100, 100.3, 110, 150, 180, 200, 210]
        nums1.map(item => {
            middleData = middleData + (`new Rect(0, 0, ${item}, ${item}),new Rect(100, 100, 100 100)]`);
        })
        // 右下角区域，老区域保持不变 7 
        const nums2 = [600, 500, 499.5, 400, 240, 299.5, 0]
        nums2.map(item => {
            middleData = middleData + (`new Rect(300, 300, 200 200),new Rect(${item}, ${item}, 200, 200)]`);
        })
        // 由内到外 6
        middleData = middleData + `new Rect(300, 300, 300 300),new Rect(350, 350, 200, 200)]`
        middleData = middleData + `new Rect(300, 300, 300 300),new Rect(300, 300, 299.5, 299.5)]`  //有问题
        middleData = middleData + `new Rect(300, 300, 300 300),new Rect(300, 300, 300, 300)]`
        middleData = middleData + `new Rect(300, 300, 300 300),new Rect(299, 299, 310, 310)]`
        middleData = middleData + `new Rect(300, 300, 300 300),new Rect(299.5, 299.5, 310, 310)]`
        middleData = middleData + `new Rect(300, 300, 300 300),new Rect(250, 250, 420, 420)]`
        // 由外到内 4
        middleData = middleData + `new Rect(300, 300, 300 300),new Rect(200, 200, 500, 500)]`
        middleData = middleData + `new Rect(300, 300, 300 300),new Rect(299.5, 299.5, 200, 200)]`
        middleData = middleData + `new Rect(300, 300, 300 300),new Rect(300, 300, 300.1, 300.1)]`
        middleData = middleData + `new Rect(300, 300, 300 300),new Rect(320, 320, 200, 200)]`
        props.setTextInfo(middleData);
    }

    useEffect(() => {
        if (rectList.length) {
            //更新配置
            console.log('执行了更新', rectList);
            setOldData({
                left: Number(rectList[index][0]),
                top: Number(rectList[index][1]),
                width: Number(rectList[index][2]),
                height: Number(rectList[index][3])
            })
            setNewData({
                left: Number(rectList[index][4]),
                top: Number(rectList[index][5]),
                width: Number(rectList[index][6]),
                height: Number(rectList[index][7])
            })

        }
    }, [index, rectList])

    const UpdateConfig = (action) => {
        if (action === "up") {
            if (index === 0) {
                setIndex(() => rectList.length - 1);
            } else {
                setIndex(val => index - 1)
            }
        }
        if (action === "down") {
            if (index === rectList.length - 1) {
                setIndex(0);
            } else {
                setIndex(val => index + 1)
            }
        }
    }

    const pushDatatoList = () => {
        // 获取区域数据，注入对象列表setRectList
        const rectStr = props.textInfo;
        const rectStrList = rectStr.match(/[\d\.]+/g)
        // 清空原有数据
        setRectList(val => ([]))
        // 先将原有数据替换为新插入的数据，然后将数组中第一列数据注入到input中
        for (let i = 0; i < rectStrList.length; i = i + 8) {
            setRectList(oldVal => ([...oldVal, [...rectStrList.slice(i, i + 8)]])
            )
        }
        setIndex(0);
    }
    
    return <>
        <div className="quick">
            <p>快捷操作</p>
            <TextArea value={props.textInfo} onChange={(e) => {
                props.setTextInfo(e.target.value)
            }} rows={4} />

            <div style={{ marginTop: 10, marginBottom: 20 }}>当前index:{index} {generateLabel(index)}</div>
            
            <Space>
                <Button onClick={pushDatatoList} >数据注入</Button>
                <Button type="primary" onClick={
                    () => {
                        UpdateConfig("up")
                    }
                }>上一个</Button>
                <Button type="primary" onClick={
                    () => {
                        UpdateConfig("down")
                    }
                }>下一个</Button>
                <Button onClick={generateRectList}>数据生成</Button>
            </Space>
        </div>

    </>
}

export default QuickAction;