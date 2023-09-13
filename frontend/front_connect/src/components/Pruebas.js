function Prompt({socket}) {

    return (
      <div>
          <div className='promp-body'>
              <ReactScrollableFeed className='scroll'>
                <div className='response'>
                  {commandRes.map((responseCon,index) => {
                    let com=pcommand.map((responseCon,index) => {
                      if (index>=0)
                        return responseCon
                    })
                    if (index>=0)
                       console.log(com) 
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
              <br></br>
              <br></br>
              <button  onClick={endConection}>Desnocectarse</button>
          </div>
      </div>
    )
  }
  
  export default Prompt