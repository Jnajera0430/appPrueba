import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useAuthStore } from "../api/apiStoreZustand";

function Navbar() {
  const profileAuth = useAuthStore((state) => state.profile);
  const logOut = useAuthStore((state) => state.logOut);
  const navigate = useNavigate();
  return (
    <>
      {!!profileAuth ? (
        <Flex
          width="100%"
          height="100%"
          direction="row"
          justifyContent="space-between"
          px={5}
          py={5}
          background={"facebook.200"}
        >
          <Box height="100%" alignItems="center" textAlign="center">
            <Heading fontSize="larger">SISTEMA</Heading>
          </Box>
          <Box height="100%" alignItems="center" textAlign="center">
            <Heading fontSize="medium">SISTEMA DE AGENDAMIENTO</Heading>
          </Box>
          <Box height="100%" alignItems="center" textAlign="center">
            {profileAuth.rol == "user" &&
            window.location.pathname !== "/user/misCitas" ? (
              <Button
                onClick={() => {
                  navigate("/user/misCitas");
                  window.location.reload();
                }}
              >
                Mis citas
              </Button>
            ) : profileAuth.rol == "user" &&
            window.location.pathname !== "/user" ? (
              <Button
                onClick={() => {
                  navigate("/user");
                  window.location.reload();
                }}
              >
               Agendar citas
              </Button>
            ):<></>}
          </Box>
          <Box height="100%" alignItems="center" textAlign="center">
            <Button
              background="facebook.300"
              onClick={(e) => {
                e.preventDefault();
                logOut("", null);
              }}
            >
              Logout
            </Button>
          </Box>
        </Flex>
      ) : (
        <Flex
          width="100%"
          direction="row"
          justifyContent="space-between"
          px={5}
          paddingTop={3}
          pb={1}
          background="gray.200"
        >
          <Box height="100%" alignItems="center" textAlign="center">
            <Heading fontSize="larger">SISEMA</Heading>
          </Box>
          <Box height="100%" alignItems="center" textAlign="center">
            <Heading fontSize="medium">
              BIENVENIDO A LA APP
            </Heading>
          </Box>
          <Box height="100%" alignItems="center" textAlign="center"></Box>
        </Flex>
      )}
    </>
  );
}

export default Navbar;
