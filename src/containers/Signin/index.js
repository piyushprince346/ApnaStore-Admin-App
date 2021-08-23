import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Signin() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const loginHandler = (event) => {
        event.preventDefault();
        const user = {
            email: email,
            password: password
        }
        dispatch(login(user));
    }
    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    return (
        <Layout>
            <Container style={{ paddingTop: '60px' }}>
                <Row style={{ marginTop: '30px' }}>
                    <Col></Col>
                    <Col xs={6}>
                        <h2><u>Login Form</u></h2>
                        <Form onSubmit={loginHandler}>
                            <Input
                                label='Email'
                                placeholder='Enter email'
                                value={email}
                                type='email'
                                onChange={(e) => {
                                    setemail(e.target.value)
                                }}
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

export default Signin
