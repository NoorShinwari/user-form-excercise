import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
// component

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisV,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// ----------------------------------------------------------------------

type Props = {
  deleteUser: () => void;
  id: string | number;
};

const MoreMenu = (props: Props) => {
  const theme = useTheme();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { deleteUser, id } = props;

  return (
    <>
      <IconButton
        ref={ref}
        aria-label="More Actions"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faEllipsisV} height={20} width={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }} onClick={deleteUser}>
          <ListItemIcon>
            <FontAwesomeIcon
              color={theme.palette.error.dark}
              icon={faTrash}
              height={24}
              width={24}
            />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={`${id}`}
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <FontAwesomeIcon
              color={theme.palette.primary.dark}
              icon={faEdit}
              height={24}
              width={24}
            />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};
export default MoreMenu;
