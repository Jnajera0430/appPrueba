import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../api/apiStoreZustand";
import { getObtenerCitasPorUser } from "../../../api/axiosStore";
import {ListaCitasAgendadas} from "./ListaCitasAgendadas";

function CitasAgendadas() {
    const profile = useAuthStore((state)=>state.profile);
    const [datos, setDatos] = useState([]);
    const obtenerCitasDelUsuario= async(idUser)=>{
        const datos = await getObtenerCitasPorUser(idUser);
        console.log(datos.data.citasUsuario); 
        setDatos(datos.data.citasUsuario);
    }
    useEffect(()=>{
      obtenerCitasDelUsuario(profile.idUser);
    },[])
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <table style={{ width: "100%", height: "100%" }}>
        <thead style={{ width: "100%", height: "100%" }}>
          <tr
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <th className="thListaConteo">#</th>
            <th className="thLista">FECHA</th>
            <th className="thLista">HORA INICIO</th>
            <th className="thLista">HORA FINAL</th>
            <th className="thLista">MEDICO</th>
            <th className="thLista">CONFIRMACION</th>
            <th className="thListaAccione">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
            {
                datos.map((citas,i)=>(
                    <ListaCitasAgendadas citas={citas} key={citas.id} i={i} obtenerCitasDelUsuario={obtenerCitasDelUsuario}/>
                ))
            }
        </tbody>
      </table>
    </div>
  );
}

export default CitasAgendadas;
