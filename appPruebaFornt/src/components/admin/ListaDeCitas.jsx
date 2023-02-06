import { Button } from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import {
  confirmarCitaAgendada,
  confirmarFinalizacionCita,
  deleteCitaAgendada,
} from "../../../api/axiosStore";
import "../../App.css";
const ListaDeCitas = ({ datos, i, obtenerDatosCitas }) => {
  return (
    <tr
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <td className="thListaConteo">{i + 1}</td>
      <td className="thLista">
        {datos.usuario ? datos.usuario.nombre : "Sin usuario"}
      </td>
      <td className="thLista">{datos.empleado.nombre}</td>
      <td className="thLista">{datos.fecha}</td>
      <td className="thLista">{datos.hora_inicio}</td>
      <td className="thLista">{"30 min"}</td>
      <td className="thLista">
        {datos.confirmacion ? "Confirmado" : "Sin confirmar"}
      </td>
      <td className="thListaEstado">
        {datos.estado &&
        datos.usuario &&
        (datos.confirmacion || !datos.confirmacion)
          ? "Finalizada"
          : !datos.estado && datos.usuario
          ? "No disponible"
          : "Disponible"}
      </td>
      <td className="thListaAccione">
        <Button
          
          onClick={(e) => {
            const datosRespuesta = confirmarFinalizacionCita(datos.id);
            const datosRespuestaMostrar = datosRespuesta.then(datos=>datos.json()).then(response=>response).catch(err=>console.log({err}));
            console.log(datosRespuestaMostrar);
            obtenerDatosCitas();
            window.location.reload();
          }}
          color={"yellow.500"}
        >
          <GiConfirmed />
        </Button>
        <Button
        
          name="editCita"
          onClick={(e) => {
            if (!datos.usuario)
              return alert("No hay un paciente vinculado a esta agenda"); 

            confirmarCitaAgendada(datos.id);
            obtenerDatosCitas();
            window.location.reload();
          }}
          color={"facebook.400"}
        >
          <BiEdit fontSize={20}/>
        </Button>
        <Button
          name="deleteCita"
          onClick={(e) => {
            deleteCitaAgendada(datos.id);
            obtenerDatosCitas();
            window.location.reload();
          }}
          color={"red.300"}
        >
          <RiDeleteBin6Fill />
        </Button>
      </td>
    </tr>
  );
};

export default ListaDeCitas;
