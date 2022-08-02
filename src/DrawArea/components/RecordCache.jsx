import React, { useState } from 'react'
import { Space, Input, Button, Collapse } from 'antd';
import useLocalStorage from '../../utils/useLocalStorage';


const { Panel } = Collapse;

const RecordCache = (props) => {
    const { setOldData, oldData, newData, setNewData } = props;
    const [name, setName] = useState("")
    const [configList, setConfigList] = useLocalStorage(
        "config",
        []
    );
    // 缓存
    const saveConfig = () => {
        if (name === "") return;
        setConfigList(value => {
            return [...value, {
                name: name,
                old: oldData,
                new: newData
            }]
        })
    }
    return <>
        <div className='cacheArea'>
            <Space>
                <Input value={name} onChange={(e) => {
                    setName(e.target.value)
                }} />
                <Button type="primary" onClick={saveConfig}>存储</Button>
                <Button type="dashed" danger onClick={() => {
                    setConfigList([]);
                }}>清空缓存</Button>
            </Space>
            <Collapse
                bordered={false}
                style={{ marginTop: 20 }}
            >
                <Panel header="缓存记录列表" key="1" >
                    {
                        configList.map((item, i) => {
                            return <div style={{ marginTop: 10, fontSize: 15 }}>&nbsp;&nbsp;&nbsp;
                                {item.name}  <Button onClick={
                                    () => {
                                        setOldData(configList[i].old)
                                        setNewData(configList[i].new)
                                    }
                                }>还原</Button>
                            </div>
                        })
                    }
                </Panel>

            </Collapse>

        </div>
    </>

}

export default RecordCache;