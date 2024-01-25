import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PageHero from "../components/PageHero";

export default function ConfirmEmail() {
  const { userInfo } = useSelector((state) => state.auth);

  return !userInfo || !userInfo.isVerified ? (
    <>
      <PageHero title />
      <Container>
        <Box sx={{ my: 30 }}>
          <Container component="main">
            <Typography sx={{ textAlign: "center" }} variant="h4">
              Please Confirm your email to purchase your products
            </Typography>
          </Container>
        </Box>
      </Container>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
  //     return (
  //       <>
  //             <Container>
  //             <Box sx={{ my: 30 }}>
  //                     <Container component="main" maxWidth="xs" >
  //               <Typography>Please Confirm your email to purchase your products</Typography>
  //                     </Container>
  //                     </Box>
  //           </Container>
  //       </>
  //   )
}
