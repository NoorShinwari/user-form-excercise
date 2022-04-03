import SimpleBarReact from "simplebar-react";

import { alpha, styled } from "@mui/material/styles";

import { Box, SxProps } from "@mui/material";

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
}

// ----------------------------------------------------------------------

const RootStyle = styled("div")({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
});

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));

// ----------------------------------------------------------------------

export const Scrollbar = ({ children, sx, ...other }: Props) => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    return <Box {...other}>{children}</Box>;
  }
  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
};
