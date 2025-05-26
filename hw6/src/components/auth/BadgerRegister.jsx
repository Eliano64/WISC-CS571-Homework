import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRef,useContext } from 'react';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerRegister() {

    const username = useRef();
    const pin = useRef();
    const repeatPin = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    //  Create the register component.
    const handelRegister = () => {
        // console.log("Password Value:", password.current.value);
        // console.log("Repeat Password Value:", repeatPassword.current.value);
        // console.log("Password Test Result:", /^\d{7}$/.test(password.current.value));
        // console.log("Repeat Password Test Result:", /^\d{7}$/.test(repeatPassword.current.value));
        const valid1 = /^\d{7}$/.test(pin.current.value)
            && /^\d{7}$/.test(repeatPin.current.value);
        if (!valid1) {
            alert("Your pin must be a 7-digit number!");
            pin.current.value = "";
            repeatPin.current.value = "";
            return;
        }
        const valid2 = username.current.value.length !== 0 && pin.current.value.length !== 0;
        if (!valid2) {
            alert("You must provide both a username and pin!");
            pin.current.value = "";
            repeatPin.current.value = "";
            return;
        }
        const valid3 = pin.current.value === repeatPin.current.value;
        if (!valid3) {
            alert("Your pins do not match!");
            pin.current.value = "";
            repeatPin.current.value = "";
            return;
        }
        return fetch("https://cs571.org/rest/s25/hw6/register", {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                pin: pin.current.value
            }),
            credentials: "include"

        }).
            then(res => {
                if (res.status === 409 || res.status === 200) {
                    if (res.status === 409) {
                        alert("That username has already been taken!");
                    }
                    username.current.value = "";
                    pin.current.value = "";
                    repeatPin.current.value = "";
                    if (res.status === 200) {
                        return res.json()
                        .then(data => {
                            sessionStorage.setItem("loginStatus",JSON.stringify({ 
                                username: username.current.value,
                                auth: data.token
                             }));
                            setLoginStatus(JSON.parse(sessionStorage.getItem("loginStatus")))
                            navigate("/");
                            return data;
                        })
                        
                    }
                }

            }).
            then(json => {
                console.log(json);

            });
    }

    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor='username'>Usersame</Form.Label>
            <Form.Control id="username" placeholder="Enter name" ref={username} />
            <br />
            <Form.Label htmlFor='password' >Password</Form.Label>
            <Form.Control id="password" type="password" placeholder="password" ref={pin} />
            <br />
            <Form.Label htmlFor='repeatpassword' >Repeat Password</Form.Label>
            <Form.Control id="repeatpassword" type="password" placeholder="confirm password" ref={repeatPin} />
            <br />
            <Button variant='primary' onClick={handelRegister}>Register</Button>
        </Form>
    </>
}
