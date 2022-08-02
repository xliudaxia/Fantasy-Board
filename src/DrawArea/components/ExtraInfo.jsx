import React from 'react'

const ExtraInfo = () => {
    return <>
        <div className='extraArea' >
            颜色表：
            <div style={{ color: 'gray', fontSize: 15, marginBottom: 10 }}>
                灰色边线代表old区域，红色边线代表new区域
            </div>
            <div>
                <table border={3} align="center" width="400" height="100" bordercolor="gray">
                    <tr>
                        <td align="center">clips[0]</td>
                        <td width={100} style={{ background: 'deepskyblue' }}></td>
                    </tr>
                    <tr>
                        <td align="center">clips[1]</td>
                        <td width={100} style={{ background: 'orange' }}></td>
                    </tr>
                    <tr>
                        <td align="center">clips[2]</td>
                        <td width={100} style={{ background: 'pink' }}></td>
                        <td align="center">RcSrc</td>

                        <td width={100} style={{ background: 'gray' }}></td>
                    </tr>
                    <tr>
                        <td align="center">clips[3]</td>
                        <td width={100} style={{ background: 'rgb(21, 101, 192)' }}></td>
                        <td align="center">RcKeep</td>
                        <td width={100} style={{ background: 'rgba(102, 255, 0, .3)' }}></td>
                    </tr>
                </table>
            </div>
        </div>
    </>
}

export default ExtraInfo;