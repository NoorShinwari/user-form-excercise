import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
  Chip,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

// components
import Page from "../components/Page";
import User from "../models/User";
import UserService from "../services/user.service";
import { Scrollbar } from "../components/Scrollbar";
import Loader from "../components/Loader";
import MoreMenu from "../components/MoreMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";

type Props = {};

const Users = (props: Props) => {
  const [page, setPage] = React.useState<number>(0);
  const [users, setUsers] = React.useState<Array<User>>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(20);
  const [usersCount, setUsersCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [hasError, setHasError] = React.useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const TABLE_HEAD = React.useMemo(
    () => [
      { id: "name", label: "Name", alignRight: false },
      { id: "email", label: "Email", alignRight: false },
      { id: "gender", label: "Gender", alignRight: false },
      { id: "status", label: "Status", alignRight: false },
      { id: "" },
    ],
    []
  );

  const fetchUsers = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      const response = await UserService.get({ page: page + 1 });
      console.log(response);
      if (response.status === 200) {
        const { data, headers } = response;

        const limit = +headers["x-pagination-limit"];
        const userCount = +headers["x-pagination-total"];
        const currentPage = +headers["x-pagination-page"];
        const totalPages = +headers["x-pagination-pages"];
        console.log(totalPages);
        setUsers(data);
        setUsersCount(userCount);
        setRowsPerPage(limit);
        setIsLoading(false);
      }
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  }, [page]);

  React.useEffect(() => {
    let _run = true;

    if (_run) {
      fetchUsers();
    }

    return () => {
      _run = false;
    };
  }, [fetchUsers]);

  const deleteUser = React.useCallback(
    async (id: string | number) => {
      console.log("i am clicked deleted");
      try {
        setIsLoading(true);
        const response = await UserService.delete(id);
        if (response.status === 204) {
          enqueueSnackbar("User deleted successfully ", {
            variant: "success",
          });
          fetchUsers();
        } else {
          enqueueSnackbar("Couldn't delete user!", {
            variant: "error",
          });
        }
        setIsLoading(false);
        console.log(response);
      } catch (error) {
        console.log(error);
        setIsLoading(false);

        enqueueSnackbar("Couldn't delete user!", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, fetchUsers]
  );
  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(1);
  // };
  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0]?.[0] ?? ""}${
        name.split(" ")[1]?.[0] ?? ""
      }`,
    };
  };
  if (hasError) {
    return (
      <Page title="Something went wrong!">
        <Container maxWidth="xl">
          <Card
            sx={{
              height: 200,
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Stack
              alignContent={"center"}
              sx={{ gap: 1.5 }}
              justifyContent="center"
            >
              <Typography
                variant="h4"
                align="center"
                color="error"
                justifyContent={"center"}
                sx={{
                  display: "flex",
                  paddingX: 4,
                }}
              >
                Something went wrong!
              </Typography>
              <FontAwesomeIcon
                color={theme.palette.primary.dark}
                icon={faFaceSadTear}
                size="4x"
              />
            </Stack>
          </Card>
        </Container>
      </Page>
    );
  }

  return (
    <Page title="Users">
      {isLoading && (
        <Loader
          style={{
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 9999,
            position: "fixed",
            // backdropFilter: "blur(6px)",
            // WebkitBackdropFilter: "blur(6px)",
            // backgroundColor: "transparent",
          }}
        />
      )}
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography
            variant="h4"
            color="primary"
            fontWeight={"bold"}
            // gutterBottom
          >
            Users
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="create"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.dark, 0.72),
                  }}
                >
                  <TableRow>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell
                        sx={{
                          color: theme.palette.common.white,
                        }}
                        key={headCell.id}
                        align={headCell.alignRight ? "right" : "left"}
                      >
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length === 0 && (
                    <TableRow style={{ height: 53 }}>
                      <TableCell align="center" colSpan={5}>
                        <Typography variant="h6">No Users...</Typography>{" "}
                      </TableCell>
                    </TableRow>
                  )}
                  {users.map((user) => {
                    const { id, name, email, gender, status } = user;

                    return (
                      <TableRow hover key={id}>
                        <TableCell component="th" scope="row">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar {...stringAvatar(name)} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            textTransform: "capitalize",
                          }}
                        >
                          {gender}
                        </TableCell>

                        <TableCell align="left">
                          <Chip
                            label={status}
                            sx={{
                              textTransform: "capitalize",
                            }}
                            color={status === "active" ? "success" : "error"}
                          />
                        </TableCell>

                        <TableCell align="right">
                          <MoreMenu
                            deleteUser={() => deleteUser(id!)}
                            id={id!}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[20]}
            component="div"
            count={usersCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            // onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
        </Card>
      </Container>
    </Page>
  );
};
export default Users;
