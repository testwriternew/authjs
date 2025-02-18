import React from 'react'
import WebRTCFileShareModule from '@rtcjs/fireshare-module-webrtc'
import DeviceContainer, { DevicesView } from './DevicesView'
const serverURL = ENV ==="development" ? "http://localhost:3000/" : "https://portfolio-2024.herokuapp.com/"
const WebRTCFileShareDemo = () => {

    return (
        <DeviceContainer>{({ selected }) => {

            return (
                <div>
                    <div style={{ textAlign: "center", margin: 10 }}> <h6 style={{ backgroundColor: "#b2dfdb" }}>WebRTC FileShare Module.</h6>Developed by using ReactJS,MondoDB,Expressjs,WebRTC,SocketIO as a signaling service</div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <DevicesView deviceType={selected} user="mario@gmail.com">
                            <WebRTCFileShareModule  serverUrl={serverURL} name="mario@gmail.com" targetName="dragos@gmail.com" />
                        </DevicesView>
                        <DevicesView deviceType={selected} user="dragos@gmail.com">
                            <WebRTCFileShareModule serverUrl={serverURL}name="dragos@gmail.com" targetName="mario@gmail.com" />
                        </DevicesView>
                    </div>
                </div>
            )
        }}

        </DeviceContainer>
    )
}

export default WebRTCFileShareDemo


