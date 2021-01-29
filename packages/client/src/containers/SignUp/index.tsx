import { Card } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useAuth, useSnackbar } from '../../hooks';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  inputContainer: {
    height: 90,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Index() {
  const classes = useStyles();
  const showSnackbar = useSnackbar();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, reset, formState } = useForm<Inputs>({
    mode: 'all',
  });
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const onSubmit = async (values: Inputs) => {
    setLoading(true);
    try {
      await auth.register(values);
      reset();
      const isPlatformAuthAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      if (isPlatformAuthAvailable) {
        history.push('/enablePlatformAuth');
      } else {
        history.push('/dashboard');
      }
    } catch ({ message }) {
      showSnackbar({ message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Card className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} className={classes.inputContainer}>
              <TextField
                inputRef={register()}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                id="firstName"
                label="First Name"
                autoFocus
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.inputContainer}>
              <TextField
                inputRef={register()}
                variant="outlined"
                fullWidth
                id="lastName"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} className={classes.inputContainer}>
              <TextField
                inputRef={register({
                  required: 'Required',
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid email address.',
                  },
                })}
                variant="outlined"
                fullWidth
                required
                id="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} className={classes.inputContainer}>
              <TextField
                inputRef={register({
                  required: 'Required',
                  minLength: { value: 6, message: 'Password must contain at least 6 characters.' },
                })}
                variant="outlined"
                fullWidth
                required
                error={!!errors.password}
                helperText={errors.password?.message}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={loading}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!formState.isValid || loading}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <MuiLink component={Link} to="/" variant="body2">
                Already have an account? Sign in
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
}
