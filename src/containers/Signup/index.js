import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { signup } from '../../actions';

function Signup() {
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!auth.loading) {
            setfirstname("");
            setlastname("");
            setemail("");
            setpassword("");
        }
    }, [auth.loading]);

    const signupHandler = (event) => {
        event.preventDefault();
        const user = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password
        }
        dispatch(signup(user));
    }
    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    return (
        <Layout>
            <Container style={{ paddingTop: '60px' }}>
                {auth.error}
                <Row>
                    <Col></Col>
                    <Col xs={6} style={{ color: 'red' }} >{auth.message}{auth.error}</Col>
                    <Col></Col>
                </Row>
                <Row style={{ marginTop: '30px' }}>
                    <Col></Col>
                    <Col xs={6}>
                        <h2><u>Signup Form</u></h2>
                        <Form onSubmit={signupHandler}>
                            <Row>
                                <Col>
                                    <Input
                                        label='First Name'
                                        placeholder='First Name'
                                        value={firstname}
                                        type='text'
                                        onChange={(e) => { setfirstname(e.target.value) }}
                                        errorMessage=''
                                        controlId='firstName'
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        label='Last Name'
                                        placeholder='Last Name'
                                        value={lastname}
                                        type='text'
                                        onChange={(e) => { setlastname(e.target.value) }}
                                        errorMessage=''
                                        controlId='lastName'
                                    />
                                </Col>
                            </Row>
                            <Input
                                label='Email'
                                placeholder='Enter email'
                                value={email}
                                type='email'
                                onChange={(e) => { setemail(e.target.value) }}
                                errorMessage=''
                                controlId='email'
                            />

                            <Input
                                label='Password'
                                placeholder='Password'
                                value={password}
                                type='password'
                                onChange={(e) => { setpassword(e.target.value) }}
                                errorMessage=''
                                controlId='password'
                            />

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>
        </Layout>
    )
}

export default Signup
