import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {

    //  Create the login component.
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const username = useRef();
    const pin = useRef();
    const navigate = useNavigate();
    //  Create the register component.
    const handelLogin = () => {
        // console.log("Password Value:", password.current.value);
        // console.log("Repeat Password Value:", repeatPassword.current.value);
        // console.log("Password Test Result:", /^\d{7}$/.test(password.current.value));
        // console.log("Repeat Password Test Result:", /^\d{7}$/.test(repeatPassword.current.value));
        const valid1 = /^\d{7}$/.test(pin.current.value)
        if (!valid1) {
            alert("Your pin must be a 7-digit number!");
            username.current.value = "";
            pin.current.value = "";

            return;
        }
        const valid2 = username.current.value.length !== 0 && pin.current.value.length !== 0;
        if (!valid2) {
            alert("You must provide both a username and pin!");
            username.current.value = "";
            pin.current.value = "";

            return;
        }
        return fetch("https://cs571.org/rest/s25/hw6/login", {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.current.value,
                pin: pin.current.value
            }),
            credentials: "include"

        }).
            then(res => {
                if (res.status === 200) {
                   return res.json()
                    .then(data => {
                        sessionStorage.setItem("loginStatus", JSON.stringify({
                            username: username.current.value,
                            auth: data.token // 使用解析后的 data 对象中的 token
                        }));
                        setLoginStatus({
                            username: username.current.value,
                            auth: data.token // 使用解析后的 data 对象中的 token
                        });
                        
                        navigate("/");
                        return data; // 返回解析后的数据供下一个 then 处理
                    });
                } else {
                    // 对于非200状态，也尝试读取json，因为服务器可能返回错误信息的json
                    return res.json().then(errData => {
                        alert(errData.msg || "Incorrect username or pin!");
                        // username.current.value = "";
                        // pin.current.value = "";
                    })
                }
            }).
            then(json => {
                // 这个 then 块现在会接收到从上一个 then 返回的 data 或处理过的错误
                // 如果登录成功，json 就是包含 token 的对象
                // 如果登录失败但服务器返回了json错误，json 就是那个错误对象
                // 如果发生其他错误，这里可能不会执行，或者 json 是 undefined
                console.log(json);
                console.log(loginStatus);
            })
    }

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor='username'>Usersame</Form.Label>
            <Form.Control id="username" placeholder="Enter name" ref={username} />
            <br />
            <Form.Label htmlFor='password' >Password</Form.Label>
            <Form.Control id="password" type="password" placeholder="password" ref={pin} />
            <br />
            <Button variant='primary' onClick={handelLogin}>Login</Button>
        </Form>
    </>
}
