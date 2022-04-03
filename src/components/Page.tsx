import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";
// material
import { Box } from "@mui/material";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Page = forwardRef((props: Props, ref) => {
  const { children, title } = props;
  return (
    <Box
      ref={ref}
      sx={{
        py: 5,
        bgcolor: "rgb(231, 235, 240)",
        minHeight: "100vh",
      }}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
});
export default Page;
