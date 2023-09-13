import React, { useEffect,useRef } from 'react'
import { useState } from 'react';
import ReactScrollableFeed from "react-scrollable-feed";

function Prompt({socket}) {
  const [timer, setTimer] = useState(0); // Estado para el valor del temporizador
  const [isActive, setIsActive] = useState(false); // Estado para indicar si el temporizador está activo o no
  const timerValuesRef = useRef([]);
  const [commandList, setCommandList] = useState([])
  let flag1 = 0;
  const [command, setCommand] = useState("");
  const [commandRes, setCommandRes] = useState([]);
  const [tableStatus, setTableStatus] = useState(false);

  const sendCommand = async() => {
    const commandData = {message: command+"\r"}; 
    await socket.emit("send_command", commandData);
    setCommandList((list) => [...list, command]);
    console.log(commandList)
    timerValuesRef.current.push(timer); 
    setIsActive(true); // Activar el temporizador primero
    setTimer(0);
  }
  const endConection = () => {
    socket.emit("end_conection","disconect")
  }

  const showTable = () => {
    timerValuesRef.current.push(timer); 
    setTableStatus(true);
  }
  useEffect (() => {
    socket.on("receive_res", (data) => {
        if (flag1 === 0) {
            if(!(data[data.length-1]==="#" || data[data.length-1]===">")) {
              console.log("aqui no fue")
            }
            setCommandRes((list) => [...list, data]);
            setIsActive(false);
            flag1 = 1;
        }
        else {
            flag1 = 0;
        }
    });
  }, [socket]);

  useEffect(() => {
    let intervalId; // Variable para almacenar el ID del intervalo

    if (isActive) {
      intervalId = setInterval(() => {
        // Actualizar el valor del temporizador cada segundo
        setTimer(prevTimer => prevTimer + 1);
      }, 100);
    }

    return () => {
      // Limpiar el intervalo al desmontar el componente o al desactivar el temporizador
      clearInterval(intervalId);
    };
  }, [isActive]);

  return (
    <div>
        <div className='promp-body'>
            <ReactScrollableFeed className='scroll'>
              <div className='response'>
                {commandRes.map((responseCon,index) => {
                  if (index>=0)
                    return <p key={index}>{responseCon}</p>
                })}
              </div>
            </ReactScrollableFeed>
        </div>
        <div className="prompt-footer">
            <input type="text" placeholder="Write your command here" onChange={(event) => {
                    setCommand(event.target.value);
                }}
            />
            <button onClick={sendCommand}>Send</button>
        </div>
            <button  onClick={endConection}>Desconectarse</button>
            <br></br>
            <br></br>
            {/*<button onClick={showTable}>Resultados</button>*/}
        <div>
          {tableStatus && (
          <div>
          <h2>Resultados</h2> 
          <table>
      <thead>
        <tr>
          <th>Comando</th>
          <th>Intervalo de tiempo [ms]</th>
        </tr>
      </thead>
      <tbody>
        {commandList.map((command, index) => (
          <tr key={index}>
            <td>{command}</td>
            <td>{timerValuesRef.current[index+1]*100}</td>
          </tr>
        ))}
      </tbody>
    </table>
          </div>)}
        </div>
    </div>
  )
}

export default Prompt

