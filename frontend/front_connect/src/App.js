import './App.css';
import * as React from "react";
import Views from './Views';
export const UserAuthu = React.createContext();



function App() {
  const [user, setUser] = React.useState({ loggedIn: false});
  
  return (
    <UserAuthu.Provider value ={{ user, setUser}}>
    <div >
      {/*<div className='header'>
        <a href='https://www.ufinet.com/' target="_blank"><img src='	https://www.ufinet.com/wp-content/uploads/2015/09/logo_ufinet.png' id='icon'/></a>
        <div className='manual'>
          <h2>Manual</h2>
          <img src='https://i.ibb.co/cxWq87L/documentation-line-two-color-icon-vector-removebg-preview.png'/>
        </div>  
      </div>
      {<h2>Terminal Nodo</h2>
      {/*<div className='Prompt'>
        <Prompt socket={socket}/>
  </div>*/}

      <div className='Login'>
        <Views />
      </div>
      
    </div>
    </UserAuthu.Provider>
  );
}

export default App;
