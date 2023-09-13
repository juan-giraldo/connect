import React, { useContext, useEffect, useState } from 'react'
import { UserAuthu } from '../App'
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import swal from "sweetalert";
const socket =io.connect("connetufinet.ddns.net:5002")

function Login() {
    let flag1 = 0;
    const sendCredential = () => {
        if (user.length === 0 || pass.length === 0) {
            swal("Ingresar credenciales", "Los campos usuario y contraseña no pueden estar en blanco");
        } else {
            const Credential = { user: usera, password: pass };
            socket.emit("send_credential", Credential);
            console.log(Credential);
        };
    };

    useEffect(() => {
        socket.on("rec_credential", (cred) => {
            if (flag1 === 0) {
                console.log(cred);
                if (cred === true) {
                    setUser({ loggedIn: !user.loggedIn });
                    socket.close();
                    navigate("/connect");
                } else {
                    flag1 = 1;
                    swal("Credenciales Incorrecta", "Usuario o contraseña no valida");
                }
            } else
                flag1 = 0;
        });
    }, [socket]);

    /**/
    const { user, setUser } = useContext(UserAuthu);
    const navigate = useNavigate();
    const [usera, setUsera] = useState("");
    const [pass, setPass] = useState("");
    return (
        <div className='App'>
            <a href="https://www.ufinet.com/" target="_blank">
                <img src="https://www.ufinet.com/wp-content/uploads/2015/09/logo_ufinet.png" alt="Logo" />
            </a>
            <h1 className="title">Connet</h1>
            <form id="form_login">
                <div className='User'>
                    <input type="text" id="txtusu" style={{ textAlign: "center" }} className="form-control" onChange={(e) => setUsera(e.target.value)} required />
                </div>
                <div>
                    <input type="password" id="txtpas" style={{ textAlign: "center" }} className="form-control" onChange={(e) => setPass(e.target.value)} required />
                </div><br />
            </form>
            <button onClick={sendCredential} className='Boton'>Login</button>
        </div>

    );
}

export default Login