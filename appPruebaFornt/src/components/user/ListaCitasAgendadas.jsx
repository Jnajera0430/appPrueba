import { Button } from "@chakra-ui/react";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import { useAuthStore } from "../../../api/apiStoreZustand";
import {
  cancelarCitasUsuario,
  confirmarCitasUsuario,
} from "../../../api/axiosStore";

export const ListaCitasAgendadas = ({ citas, i, obtenerCitasDelUsuario }) => {
  const profile = useAuthStore((state) => state.profile);

  return (
    <tr
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <td className="thListaConteo">{i + 1}</td>
      <td className="thLista">{citas.fecha}</td>
      <td className="thLista">{citas.hora_inicio}</td>
      <td className="thLista">{citas.hora_final}</td>
      <td className="thLista">{citas.empleado.nombre}</td>
      <td className="thListaEstado">
        {citas.confirmacion ? "confirmado" : "Sin confirmar"}
      </td>
      <td className="thListaAccione">
        {!citas.confirmacion ? (
          <>
            <Button
              onClick={(e) => {
                if (citas.confirmacion)
                  return alert("Esta cita no esta Disponible");
                const data = confirmarCitasUsuario(
                  profile.idUser,
                  citas.id
                ).then((data) => data.json());
                obtenerCitasDelUsuario(profile.idUser);
              }}
              color="facebook.400"
            >
              <GiConfirmed />
            </Button>
            <Button
              onClick={(e) => {
                const data = cancelarCitasUsuario(profile.idUser, citas.id)
                  .then((response) => response.json()).then(data=>data)
                  .catch((err) => console.log({ err }));
                console.log(data);
                obtenerCitasDelUsuario(profile.idUser);
              }}
              color="red.300"
              
            >
              <MdOutlineCancel fontSize={"20px"}/>
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={ (e) => {
                const data = cancelarCitasUsuario(profile.idUser, citas.id).then((data) => data.text()).catch(err=>console.log({err}));
                console.log(data.then(response=>response));
                obtenerCitasDelUsuario(profile.idUser);
              }}
              color="red.300"
            >
              <MdOutlineCancel />
            </Button>
          </>
        )}
      </td>
    </tr>
  );
};
