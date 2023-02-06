import { axiosApi, axiosApiLogin } from "./axiosConfig";

export const postLogin = async (datos) => {
  return axiosApiLogin.post("/users/login", datos);
};
export const getDatosUser = async (token) => {
  return await axiosApiLogin.get("/users/home", { headers: { token } });
};

export const getCitasDisponiblesUser = async () => {
  return await axiosApi.get("/users/citas");
};

export const putAgendarCitaUser = async (idUser, idCita) => {
  return await axiosApi.put(`/users/citas/agendarCita/${idUser}/${idCita}`);
};

export const getObtenerCitasPorUser = async (idUser) => {
  return await axiosApi.get(`/users/citas/user/${idUser}`);
};

export const confirmarCitasUsuario = async (idUser, idCita) => {
  return axiosApi.put(`/users/citas/cofirmar/${idUser}/${idCita}`);
};

export const cancelarCitasUsuario = async (idUser, idCita) => {
  return await axiosApi.delete(`/users/citas/cancelar/${idUser}/${idCita}`);
};

export const getDatosDeAgendamiento = async () => {
  return await axiosApi.get("/agendamiento/admin");
};

export const confirmarFinalizacionCita = async (idCita) => {
  return await axiosApi.put(`/agendamiento/admin/confirmar/${idCita}`);
};

export const postCrearAgendamiento = async (datosAgendamiento) => {
  return await axiosApi.post(
    "/agendamiento/admin/agregarAgenda",
    datosAgendamiento
  );
};

export const getTodasLasCitas = async () => {
  return axiosApi.get("/agendamiento");
};

export const confirmarCitaAgendada = async (idCita) => {
  return await axiosApi.put(`/agendamiento/admin/editAgenda/${idCita}`);
};

export const deleteCitaAgendada = async (idCita) => {
  return axiosApi.delete(`/agendamiento/admin/deleteAgenda/${idCita}`);
};
