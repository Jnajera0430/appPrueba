import { axiosApi, axiosApiLogin } from "./axiosConfig";

export const postLogin = async (datos) => {
  return axiosApiLogin.post("/users/login", datos);
};
export const getDatosUser = async (token) => {
  return await axiosApiLogin.get("/users/home", { headers: { token } });
};

export const getDatosDeAgendamiento = async() =>{
  return await axiosApi.get("/agendamiento/admin");
}

export const postCrearAgendamiento = async(datosAgendamiento)=>{
  return await axiosApi.post("/agendamiento/admin/agregarAgenda",datosAgendamiento)
}