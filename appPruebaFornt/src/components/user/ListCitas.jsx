import { Button } from "@chakra-ui/react";
import React from "react";
import { useAuthStore } from "../../../api/apiStoreZustand";
import { putAgendarCitaUser } from "../../../api/axiosStore";

function ListCitas({ citas, i }) {
    const profile = useAuthStore((state)=>state.profile);
    console.log(profile); 
  return (
    <tr style={{
        width:"100%",
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center'

      }}>
      <td className="thListaConteo">{i + 1}</td>
      <td className="thLista">{citas.fecha}</td>
      <td className="thLista">{citas.hora_inicio}</td>
      <td className="thLista">{citas.hora_final}</td>
      <td className="thLista">30 min</td>
      <td className="thLista">{citas.empleado.nombre}</td>
      <td className="thListaEstado">{citas.estado === null ? "Disponible" : !citas.estado ? "Agendada" :"Terminada"}</td>
      <td className="thListaAccione">
        <Button onClick={async(e)=>{
            if(citas.estado)return alert('Esta cita no esta Disponible');
            const data = await putAgendarCitaUser(profile.idUser,citas.id);
            console.log(data);
            window.location.reload();
        }}>tomar cita</Button>
      </td>
    </tr>
  );
}

export default ListCitas;
