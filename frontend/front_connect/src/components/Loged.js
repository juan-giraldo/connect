import React, { useEffect } from 'react'
import { useState } from 'react';
import io from "socket.io-client"
import Prompt from '../Prompt';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Spinner} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import swal from "sweetalert";
let node="http://localhost:5002"
const socket =io.connect(node);
let conect =false

const Loged = () =>{
    const [nodesel,setNodesel] = useState("desconectado")
    let flag1 = 0;
    const [dropdown,setDropdown]=useState(false);
    const openList = () =>{
        setDropdown(!dropdown);
    } 
    useEffect (() => {
        socket.on("status_soc", (status) => {
            if (flag1 === 0) {
      
                console.log(status)
                    if (status === "ocupado") {
                        swal("Equipo en uso","Actualmente otro usuario esta gestionando este equipo por favor intentelo mas tarde")
                        flag1 = 1
                    } else setNodesel(status);
            } else flag1 = 0;
        });
    },[socket]);
    const send_dev = (dev) =>{
        console.log("enviado",dev)
        socket.emit("send_dev",dev)
    }

    return (
      <div>
        <div className="container_head">
          <a href="https://www.ufinet.com/" target="_blank">
            <img src="https://www.ufinet.com/wp-content/uploads/2015/09/logo_ufinet.png" alt="Logo" />
          </a>
          <div className='Manual'>
          <h1>Manual</h1>
          <img src="https://cdn-icons-png.flaticon.com/512/1568/1568401.png" className="Icono" alt="Manual" />
          </div>
        </div>
        {nodesel==="conectado" ? (
            <div className='App'>
              <Prompt socket={socket}/>
            </div>
        ) : nodesel==="conectando" ? (
            <div>
                <h1>Conectando</h1>
                <Spinner color='primary'/>
            </div>
        ) : (
            <div className='drop'>
            <Dropdown isOpen = {dropdown} toggle={openList} size = "large" style={{ width: '75%', margin: '0 auto' }} >
                <DropdownToggle caret style={{ width: '100%', margin: '0 auto' }}>
                    Seleccionar el equipo que desea gestionar
                </DropdownToggle>
                <DropdownMenu className='items'>
                    <DropdownItem onClick={() => send_dev("NJa-CCast")}>Cisco Catalyst - Nodo Jardin</DropdownItem>
                    <DropdownItem onClick={() => send_dev("NDa-CASR")}>Cisco ASR - Nodo Darien</DropdownItem>
                    <DropdownItem onClick={() => send_dev("NTu-R2948")}>Raisecom 2948 - Nodo Tulua</DropdownItem>
                    <DropdownItem >Raisecom 2948 - Nodo Roldanillo</DropdownItem>
                    <DropdownItem >Cisco ASR - Nodo Roldanillo</DropdownItem>
                    <DropdownItem >Raisecom 2948 - Nodo Sevilla</DropdownItem>
                    <DropdownItem >Cisco ASR - Nodo Sevilla</DropdownItem>
                    <DropdownItem >Raisecom 2948 - Nodo Zarzal</DropdownItem>
                    <DropdownItem >Cisco ASR - Nodo Zarzal</DropdownItem>
                    <DropdownItem >Raisecom 2948 - Nodo Argelia</DropdownItem>
                    <DropdownItem >Cisco ASR - Nodo Argelia</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        )
        }
      </div>  
    );
}

export default Loged