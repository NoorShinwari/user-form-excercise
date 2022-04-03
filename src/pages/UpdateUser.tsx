import * as React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { alpha, styled } from "@mui/material/styles";
import Page from "../components/Page";
import Loader from "../components/Loader";
import User from "../models/User";
import UserService from "../services/user.service";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import { AxiosError } from "axios";
import _ from "lodash";
import { CircularProgress, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";

const RootStyle = styled("div")(({ theme }) => ({
  "&:before": {
    top: 0,
    zIndex: 9,
    width: "100%",
    content: "''",
    height: "100%",
    position: "absolute",
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)", // Fix on Mobile
    backgroundColor: alpha(theme.palette.primary.dark, 0.72),
  },
}));
const InfoStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));
const CoverImgStyle = styled("img")({
  zIndex: 8,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

type Props = {};
enum UserStatus {
  unknown = "unknown",
  found = "found",
  notFound = "notFound",
  error = "error",
}

const UpdateUser = (props: Props) => {
  const [user, setUser] = React.useState<User>({
    id: "",
    name: "",
    email: "",
    gender: "female",
    status: "active",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [userStatus, setUserStatus] = React.useState<UserStatus>(
    UserStatus.unknown
  );
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const { id = null } = params;
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().trim("Required").required("Name is required"),
    surname: Yup.string().trim("Required").required("Surname is equired"),
    email: Yup.string()
      .trim("Required")
      .required("Email is required")
      .email("Email is not valid"),

    gender: Yup.string().trim("Required").required("This field is required"),

    status: Yup.string().notRequired(),
  });

  const getUser = React.useCallback(async () => {
    if (!id) {
      return undefined;
    }

    try {
      setUserStatus(UserStatus.unknown);
      setIsLoading(true);

      const response = await UserService.getById(id);
      console.log(response);
      if (response.status === 200) {
        const { data } = response;
        setUserStatus(UserStatus.found);
        setUser(data);
      } else {
        setUserStatus(UserStatus.notFound);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setUserStatus(UserStatus.error);
      setIsLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    let _run = true;
    if (_run) {
      getUser();
    }
    return () => {
      _run = false;
    };
  }, [getUser]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user.id,
      name: user.name?.split(" ")?.[0] || "",
      surname: user.name?.split(" ")?.[1] || "",
      email: user.email,
      gender: user.gender,
      status: user.status,
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const { id, name, surname, email, gender, status } = values;
        if (!id) {
          throw new Error("No User Id");
        }
        const fullName = `${name} ${surname}`;
        const data: User = { name: fullName, email, gender, status };
        const response = await UserService.modify(id, data);
        if (response.status === 200) {
          const { data } = response;
          console.log(response);
          setUser(data);
          setUserStatus(UserStatus.found);

          setSubmitting(false);
          enqueueSnackbar("User updated successfully", {
            variant: "success",
          });
          //   navigate("/users", { replace: true });
        } else {
          setSubmitting(false);
          setUserStatus(UserStatus.notFound);

          enqueueSnackbar("Couldn't update user!", {
            variant: "error",
          });
        }
      } catch (error: any) {
        setSubmitting(false);
        setUserStatus(UserStatus.error);

        if (error.isAxiosError) {
          error as AxiosError;

          switch (error?.response?.status) {
            case 422:
              enqueueSnackbar(error?.response?.statusText, {
                variant: "error",
              });
              break;

            default:
              enqueueSnackbar(error?.response?.statusText, {
                variant: "error",
              });
              break;
          }
        } else {
          enqueueSnackbar("Couldn't update user!", {
            variant: "error",
          });
        }
      }
    },
  });
  const {
    errors,
    touched,
    values,
    initialValues,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;
  console.log(userStatus);

  switch (userStatus) {
    case UserStatus.unknown:
      return (
        <Loader
          style={{
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 9999,
            position: "fixed",
          }}
        />
      );

    case UserStatus.notFound:
    case UserStatus.error:
      return (
        <Page title="User not found">
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
                  User Not Found
                </Typography>
                <FontAwesomeIcon icon={faFaceSadTear} size="4x" />
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  BACK
                </Button>
              </Stack>
            </Card>
          </Container>
        </Page>
      );
    default:
      return (
        <Page title="Modify user">
          {isLoading && (
            <Loader
              style={{
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 9999,
                position: "fixed",
              }}
            />
          )}
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Container maxWidth="xl">
                <Card
                  sx={{
                    height: 200,
                    position: "relative",
                    mb: 3,
                  }}
                >
                  <RootStyle>
                    <InfoStyle>
                      <Typography
                        variant="h4"
                        color="white"
                        sx={{
                          display: "flex",
                          paddingX: 4,
                        }}
                      >
                        Modify User
                      </Typography>
                    </InfoStyle>
                    <CoverImgStyle alt="cover" src={"/cover.jpg"} />
                  </RootStyle>
                </Card>

                <Card sx={{ padding: 5 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Name"
                        {...getFieldProps("name")}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Surname"
                        {...getFieldProps("surname")}
                        error={Boolean(touched.surname && errors.surname)}
                        helperText={touched.surname && errors.surname}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Email"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl>
                        <FormLabel {...getFieldProps("gender")}>
                          Gender
                        </FormLabel>
                        <RadioGroup row {...getFieldProps("gender")}>
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl component="fieldset" variant="standard">
                        <FormLabel component="legend">Status</FormLabel>
                        <FormGroup>
                          <FormControlLabel
                            labelPlacement="start"
                            sx={{
                              display: "flex",
                              justifyContent: "between",
                              marginLeft: 0,
                            }}
                            control={
                              <Switch
                                color="primary"
                                onChange={(event) =>
                                  setFieldValue(
                                    "status",
                                    event.target.checked ? "active" : "inactive"
                                  )
                                }
                                checked={values.status === "active"}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                textTransform={"capitalize"}
                                color={
                                  values.status === "active"
                                    ? "success.main"
                                    : "error"
                                }
                              >
                                {values.status}
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 2,
                        }}
                      >
                        <Button variant="outlined" onClick={() => navigate(-1)}>
                          BACK
                        </Button>
                        <Button
                          disabled={
                            _.isEqual(values, initialValues) || isSubmitting
                          }
                          variant="contained"
                          type="submit"
                          color="primary"
                        >
                          {isSubmitting ? (
                            <CircularProgress size={26} />
                          ) : (
                            "MODIFY"
                          )}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Container>
            </Form>
          </FormikProvider>
        </Page>
      );
  }
};

export default UpdateUser;
