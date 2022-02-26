import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import {Alert, CircularProgress} from "@mui/material";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../../mutation/user";

function LoginForm() {
    const [submitted, setSubmitted]     = useState(false);

    const [clientid, setClientid] = useState( 'ju16a6m81mhid5ue1z3v2g0uh' );
    const [email, setEmail] = useState( 'your@email.address' );
    const [name, setName] = useState( 'Your Name' );

    const [success, setSuccess]         = useState( false );
    // const [error, setError]             = useState( null );


    const [loginUser, { data, loading, error }]                 = useMutation(LOGIN_USER);

    const handleChange = (event) => {

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        loginUser({
            variables: {
                input: {
                    client_id: clientid, email: email, name: name
                }
            }
        }).then(({data}) => {
            console.log(data)
        }).catch( (e) => {
            console.log( e );
        })
        setSubmitted( true );
        setTimeout( ()=> setSubmitted( false ), 5000 );
    }

    return (
        <ValidatorForm
            onSubmit={handleSubmit} >
            <h2>Login</h2>
            <TextValidator
                label="ClientId"
                onChange={handleChange}
                name="clientid"
                value={clientid}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            <br />
            <TextValidator
                label="Email"
                onChange={handleChange}
                name="email"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
            />
            <TextValidator
                label="ClientId"
                onChange={handleChange}
                name="name"
                value={name}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            <br />
            { !submitted && <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={submitted}
            >
                Submit
            </Button> }
            { submitted && <CircularProgress /> }
            <br/>
            <br/>
            { success && <Alert severity="success">Your consent was submitted - thanks!</Alert> }
            { ( error !== null ) && <Alert severity="error">{error}</Alert> }
        </ValidatorForm>
    )
}

export default LoginForm;