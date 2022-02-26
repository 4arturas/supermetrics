import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import {Alert, CircularProgress} from "@mui/material";
import {useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../../mutation/user";
import {LoginContext} from "../../context/context";

function LoginForm() {

    const {loggedIn, setLoggedIn} = useContext(LoginContext);

    const createFormData = ( clientid, email, name ) => {
        return { clientid: clientid, email: email, name: name };
    }

    const [formData, setFormData]       = useState(createFormData( 'ju16a6m81mhid5ue1z3v2g0uh', 'your@email.address', 'Your Name' ));

    const [submitted, setSubmitted]     = useState(false);

    const [loginSuccess, setLoginSuccess]                   = useState( false );
    const [unsuccessfulLoginText, setUnsuccessfulLoginText]         = useState( null );

    const [loginUser, { data, loading, error }]                 = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const fData = createFormData( formData.name, formData.email, formData.name );
        fData[event.target.name] = event.target.value;
        setFormData( fData );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoginSuccess( false );
        setUnsuccessfulLoginText( null );
        loginUser({
            variables: {
                input: {
                    client_id: formData.clientid, email: formData.email, name: formData.name
                }
            }
        }).then(({data}) => {
            console.log(data);
            const status = data.status;
            setLoginSuccess( true );
            setLoggedIn( true );
        }).catch( (e) => {
            console.log( e );
            const status = data.status;
            if ( status !== 200 )
                setUnsuccessfulLoginText( data.statusText );
            else
                setUnsuccessfulLoginText( e.message );
        })
        setSubmitted( true );
        setTimeout( ()=> setSubmitted( false ), 5000 );
    }
console.log( loggedIn );
    return (

        <ValidatorForm
            onSubmit={handleSubmit} >
            <h2>Login</h2>
            <TextValidator
                label="ClientId"
                onChange={handleChange}
                name="clientid"
                value={formData.clientid}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            <br />
            <TextValidator
                label="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
            />
            <br />
            <TextValidator
                label="Name"
                onChange={handleChange}
                name="name"
                value={formData.name}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            <br />
            <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={loading}
            >
                Submit
            </Button>
            { loading && <div><br/><CircularProgress /></div> }
            <br/>
            { loginSuccess && <Alert severity="success">Login went well - you will be redirect soon to the user page</Alert> }
            { ( unsuccessfulLoginText ) && <Alert severity="error">{unsuccessfulLoginText}</Alert> }
        </ValidatorForm>
    )
}

export default LoginForm;