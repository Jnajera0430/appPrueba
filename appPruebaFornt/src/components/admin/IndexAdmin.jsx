import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTodasLasCitas } from "../../../api/axiosStore";
import { Home } from "./Home";
import ListaDeCitas from "./ListaDeCitas";

const IndexAdmin = () => {
  const [datosCitas, setDatosCitas] = useState([]);
  const obtenerDatosCitas = async () => {
    setDatosCitas([]);
    const getDatosCitas = await getTodasLasCitas();
    setDatosCitas(getDatosCitas.data.todasLasCitas);
  };
  
  useEffect(() => {
    obtenerDatosCitas();
  }, []);
  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <Home obtenerDatosCitas={obtenerDatosCitas}/>
      <Box width="80%">
        
        <table
          style={{
            width: "100%",
          }}
        >
          <thead
            style={{
              width: "100%",
            }}
          >
            <tr
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems:"center"
              }}
            >
              <th className="thListaConteo">#</th>
              <th className="thLista">PACIENTE</th>
              <th className="thLista">MEDICO</th>
              <th className="thLista">FECHA</th>
              <th className="thLista">HORA INICIO</th>
              <th className="thLista">DURACION</th>
              <th className="thLista">CONFIRMACION</th>
              <th className="thListaEstado">ESTADO</th>
              <th className="thLista">ACCIONES</th>
            </tr>
          </thead>
          <tbody
            style={{
              width: "100%",
            }}
          >
            {datosCitas.map((datos, i) => (
              <ListaDeCitas datos={datos} key={datos.id} i={i} obtenerDatosCitas={obtenerDatosCitas}/>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default IndexAdmin;
