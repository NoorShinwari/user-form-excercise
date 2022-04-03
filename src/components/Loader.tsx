import Box from "@mui/material/Box";
import { alpha, styled, Theme, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import logo from "../logo.svg";

type Props = {};

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background?.default,
}));

const Loader = ({ ...other }: any) => {
  const theme: Theme = useTheme();

  return (
    <RootStyle {...other}>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 1,
          repeat: Infinity,
        }}
      >
        <Box
          sx={{ width: 64, height: 64, alignItems: "center", display: "flex" }}
        >
          <img src={logo} alt="logo" />
        </Box>{" "}
      </motion.div>

      <motion.div
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
        style={{
          width: 100,
          height: 100,
          borderRadius: "25%",
          position: "absolute",
          border: `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{
          ease: "linear",
          duration: 3.2,
          repeat: Infinity,
        }}
        style={{
          width: 120,
          height: 120,
          borderRadius: "25%",
          position: "absolute",
          border: `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
        }}
      />
    </RootStyle>
  );
};

export default Loader;
