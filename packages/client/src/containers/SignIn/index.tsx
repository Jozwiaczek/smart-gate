import React from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Inputs = {
  email: string;
  password: string;
  remember: boolean;
};

const SignIn = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => console.log(data);

  return (
    <Container component="main" maxWidth="xs">
      <Card className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            error={!!errors.email}
            autoComplete="email"
            autoFocus
            inputRef={register({ required: true })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={!!errors.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({ required: true })}
          />
          <FormControlLabel
            name="remember"
            control={<Checkbox color="primary" />}
            label="Remember me"
            inputRef={register}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink component={Link} to="/" variant="body2">
                Forgot password?
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink component={Link} to="/" variant="body2">
                Dont have an account? Sign Up
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
};

export default SignIn;
