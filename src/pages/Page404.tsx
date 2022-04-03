import React from "react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import logo from "../logo.svg";
import Page from "../components/Page";
import { styled } from "@mui/material/styles";

type Props = {};

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

const Page404 = (props: Props) => {
  return (
    <RootStyle title="404 Page Not Found">
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <motion.div>
            <Typography variant="h4" color="primary" paragraph>
              Sorry, page not found!
            </Typography>
          </motion.div>
          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeatDelay: 1,
              repeat: Infinity,
            }}
          >
            <Box justifyContent="center" display="flex" marginY={4}>
              <img alt="react-logo" height={100} width="auto" src={logo} />
            </Box>
          </motion.div>
          <Button
            to="/"
            size="large"
            variant="contained"
            color="primary"
            component={RouterLink}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
};
export default Page404;
