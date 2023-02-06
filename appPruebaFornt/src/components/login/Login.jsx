import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { ValidEmail } from "./validEmail";
import { getDatosUser, postLogin } from "../../../api/axiosStore";
import { useAuthStore } from "../../../api/apiStoreZustand";
const Login = () => {
  const setUserLogeado = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setProfile);
  const [mensajeError, setMensajeError] = useState(undefined);
  console.log(mensajeError);
  const [seePassword, setSeePassword] = useState(null);
  const [msg, setMsg] = useState("");
  const [validatedForm, setValidatedForm] = useState({
    contraseña: null,
    email: null,
  });
  const [dataLogin, setDataLogin] = useState({
    email: "",
    contraseña: "",
  });
  const onChangeForm = (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "email") {
      setValidatedForm({
        ...validatedForm,
        email:
          e.target.value.length === 0
            ? "Value is required"
            : !ValidEmail(e.target.value)
            ? "Email not valid"
            : "",
      });
    }
    if (e.target.name === "contraseña") {
      setDataLogin({
        ...dataLogin,
        contraseña: e.target.value,
      });
      setValidatedForm({
        ...validatedForm,
        contraseña: e.target.value.length < 8 ? "Password too short" : "",
      });
    }
  };
  const onChangePassword = (e) => {
    if (e.target.value.length === 0) {
      setSeePassword(null);
    } else {
      setSeePassword(false);
    }
  };

  const handleSeePassword = () => {
    if (seePassword) {
      setSeePassword(false);
    } else {
      setSeePassword(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await postLogin(dataLogin).catch(err=>setMensajeError(err.response.data.msgError));
    setUserLogeado(data?.token);
    
    const dataUser = await getDatosUser(data?.token);
    setUser(dataUser?.data?.decode.datos);
    console.log(dataUser?.data);
    window.location.reload();
  };

  const isValidedForm = Object.keys(validatedForm).every(
    (key) => validatedForm[key] === ""
  );
  return (
    <>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        background="rgb(244,245,248)"
      >
        <form
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            maxWidth: "340px",
            background: "white",
            borderRadius: "0.2em",
            boxShadow: "0px 5px 5px #323c4626",
          }}
          onSubmit={handleSubmit}
        >
          <Flex direction={"column"} gap={5} p={12}>
            <Heading mb={6} textAlign="center">
              Log In
            </Heading>

            <Input
              placeholder="user@example.com"
              name="email"
              type={"email"}
              variant="filled"
              onChange={onChangeForm}
              autoComplete="on"
              autoFocus
            />
            <Box color="red.300">
              <b>{validatedForm.email}</b>
            </Box>
            <Flex
              direction="row"
              width="100%"
              height="100%"
              rounded={5}
              justifyContent="center"
              backgroundColor={"gray.100"}
              alignItems="center"
              _hover={{ background: "gray.200" }}
              _focusWithin={{
                borderColor: "#3182ce",
                border: "2px solid #3182ce",
              }}
              _active={{ background: "gray.200" }}
            >
              <Input
                placeholder="*********"
                onChange={(e) => {
                  onChangePassword(e);
                  onChangeForm(e);
                }}
                name="contraseña"
                type={seePassword ? "text" : "password"}
                /* background={inputBackground} */
                variant="filled"
                width="80%"
                autoComplete="on"
                border="none"
                _hover={{ background: "gray.200" }}
                rounded="none"
                _focusWithin={{ background: "gray.200" }}
              />
              <Box width="20%" bg="gray.100">
                {seePassword === null ? (
                  ""
                ) : (
                  <Button
                    width="100%"
                    onClick={handleSeePassword}
                    _hover={{ bg: "white" }}
                    rounded="none"
                  >
                    <AiOutlineEye />
                  </Button>
                )}
              </Box>
            </Flex>
            <Box color="red.300">
              <b>{validatedForm.contraseña} </b>
            </Box>
            <Button
              disabled={!isValidedForm}
              type="submit"
              colorScheme="facebook"
              mb={5}
            >
              Log in
            </Button>
          </Flex>
          {!!msg ? (
            /* <MensajesLogaout data={data}/> */
            <p>{msg}</p>
          ) : (
            ""
          )}
        </form>
        {mensajeError ? <>{mensajeError}</>:<></>} 
      </Flex>
    </>
  );
};

export default Login;
