import { Box, Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  getDatosDeAgendamiento,
  postCrearAgendamiento,
} from "../../../api/axiosStore";
import "../../App.css";
export const Home = ({obtenerDatosCitas}) => {
  const [mensajeError, setMensajeError] = useState(undefined);
  
  const [datos, setDatos] = useState({
    fecha: "",
    horaInicio: "",
    horaFinal: "",
    medico: "",
  });
  const [datosMedicos, setDatosMedicos] = useState([]);
  const [validForm, setValidForm] = useState({
    fecha: undefined,
    horaInicio: undefined,
  });
  console.log(validForm);
  const obtenerHora = (horacompleta) => {
    let horaFinal;
    let minutoFinal;
    let hora;
    const datonuevo = horacompleta.split(":");
    let minutos = parseInt(datonuevo[1]) + 30;
    if (minutos > 60) {
      hora = parseInt(datonuevo[0]) + 1;
      minutos = minutos - 60;
    } else {
      if (minutos == 60) {
        hora = parseInt(datonuevo[0]) + 1;
        minutos = 0;
      } else {
        hora = parseInt(datonuevo[0]);
      }
    }

    if (hora < 10) {
      horaFinal = `0${hora}`;
    } else {
      horaFinal = hora;
    }
    if (minutos < 10) {
      minutoFinal = `0${minutos}`;
    } else {
      minutoFinal = minutos;
    }

    const horaFinalfinal = `${horaFinal}:${minutoFinal}`;
    return horaFinalfinal;
  };
  const obtenernuevaHora = (horaInicio) => {
    let horaFinal;
    let minutoFinal;
    let hora;
    const datonuevo = horaInicio.split(":");
    let minutos = parseInt(datonuevo[1]) + 31;
    if (minutos === 60 || minutos > 60) {
      hora = parseInt(datonuevo[0]) + 1;
      minutos = minutos - 60;
    } else {
      hora = parseInt(datonuevo[0]);
    }
    if (hora < 10) {
      horaFinal = `0${hora}`;
    } else {
      horaFinal = hora;
    }
    if (minutos < 10) {
      minutoFinal = `0${minutos}`;
    } else {
      minutoFinal = minutos;
    }
    let cambioDeHoraFinal;
    let cambioDeminutoFinal = minutos + 30;
    if(cambioDeminutoFinal >= 60){
      cambioDeHoraFinal = hora + 1
      cambioDeminutoFinal = cambioDeminutoFinal - 60;
    }else{
      cambioDeHoraFinal = hora
    }
    if(cambioDeHoraFinal < 10){
      cambioDeHoraFinal = `0${cambioDeHoraFinal}`;
    }
    if(cambioDeminutoFinal < 10){
      cambioDeminutoFinal = `0${cambioDeminutoFinal}`;
    }

    const horaFinalfinal = `${horaFinal}:${minutoFinal}`;
    const cambioHorMinFinal = `${cambioDeHoraFinal}:${cambioDeminutoFinal}`;
    return {horaFinalfinal,cambioHorMinFinal};
  };

  const handleInput = (e) => {
    setDatos((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));

    if(e.target.name === "fecha"){
      setValidForm({
        ...validForm,
        fecha:  e.target.value.length > 0 ? "" : "value required"  
      })
    }
    if(e.target.name === "horaInicio"){
      setValidForm({
        ...validForm,
        horaInicio: e.target.value.length > 0 ? "" : "value required"  
      })
    }

    if (e.target.name == "horaInicio") {
      setDatos({
        ...datos,
        horaInicio: e.target.value,
        horaFinal: obtenerHora(e.target.value),
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosMensaje = await postCrearAgendamiento(datos).catch(err=>setMensajeError(err.response.data.msgError));
    console.log(datosMensaje);
    const {horaFinalfinal,cambioHorMinFinal} = obtenernuevaHora(datos.horaInicio);
    console.log(horaFinalfinal);
    setDatos({
      ...datos,
      horaInicio: "00:00"
    });
    setDatos({
      ...datos,
      horaInicio: horaFinalfinal,
      horaFinal: cambioHorMinFinal
    });
    
    obtenerDatosCitas()
  };
  const traerDatosMedicos = async () => {
    const datos = await getDatosDeAgendamiento();
    setDatosMedicos(datos.data?.empleados);
  };

  const validFormButton =  Object.keys(validForm).every(
    (key) => validForm[key] === ""
  );
  console.log(validFormButton); 
  useEffect(() => {
    traerDatosMedicos();
  },[]);
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      gap={3}
      width="20%"
      border={"1px solid "}
      borderColor="facebook.200"
      padding="10px"
      margin={"10px"}
      height="container.sm"
    >
      <form
        style={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="fecha" className="labelAgendamientos">
          fecha
          <Input
            id="fecha"
            name="fecha"
            type={"date"}
            onChange={handleInput}
            defaultValue={datos.fecha}
          />
        </label>
        <label htmlFor="horaInicio" className="labelAgendamientos">
          Hora-Inicio
          <Input
            id="horaInicio"
            name="horaInicio"
            type={"time"}
            onChange={handleInput}
            defaultValue={datos.horaInicio}
          />
        </label>
        <label htmlFor="horaFinal" className="labelAgendamientos">
          Hora-Final
          <Input
            id="horaFinal"
            name="horaFinal"
            type={"time"}
            onChange={handleInput}
            defaultValue={datos.horaFinal}
            disabled={true}
          />
        </label>
        <label htmlFor="list" className="labelAgendamientos">
          Medico
          <input
            list="docList"
            placeholder="buscar"
            id="list"
            name="medico"
            onChange={handleInput}
          />
          <datalist id="docList">
            {datosMedicos.map((datos, i) => (
              <option key={i} value={datos.idEmpleado}>
                {datos.nombre}
              </option>
            ))}
          </datalist>
        </label>
        <Button width={"5rem"} type="submit" background={"facebook.300"} >
          Generar
        </Button>
      </form>
      {
        mensajeError ? <>Hay algunos campos vacios</>:<></>
      }
    </Box>
  );
};
