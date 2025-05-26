import React, { useEffect, useState, useContext, useRef } from "react"
import BadgerMessage from "./BadgerMessage";
import { Container, Row, Col, Pagination, Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const pages = [1, 2, 3, 4];
    const [curPage, setCurPage] = useState(1);
    const [messages, setMessages] = useState([]);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const title = useRef();
    const content = useRef();

    const loadMessages = () => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=${curPage}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    const handlePost = () => {
        if (content.current.value.length === 0 || title.current.value.length === 0) {
            alert("You must provide both a title and content!")
        }
        else{
            fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=${curPage}`,{
                method: "POST",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    title: title.current.value,
                    content: content.current.value,
                })
            })
            .then(res=>{
                if(res.status === 200){
                    alert("Successfully posted!")
                    loadMessages();
                    title.current.value = "";
                    content.current.value = "";
                }
                return res.json();
            })
        }
    }

    const handleDelete = (id) => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?id=${id}`,{
            method: "DELETE",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
            credentials: "include",
        })
        .then(res=>{
            if(res.status === 200){
                alert("Successfully deleted the post!")
                loadMessages();
            }
            return res.json();
        })
    }

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, curPage]);

    return <>
        <h1>{props.name} Chatroom</h1>
        <hr />
        <Container fluid>
            <Row>
                <Col xs={3} sm={3} lg={3} xl={3}>
                    {
                        // : Allow an authenticated user to create a post. 
                        (loginStatus ?? false) ?

                            <Form>
                                <Form.Label htmlFor="title">Post Title</Form.Label>
                                <Form.Control id="title" ref={title}/>
                                <br />
                                <Form.Label htmlFor="content">Post Content</Form.Label>
                                <Form.Control id="content" as="textarea" rows={15} ref={content}/>
                                <br />
                                <Button variant="primary" onClick={handlePost}>Create Post</Button>
                            </Form>
                            :
                            <p>
                                You must be logged in to post!
                            </p>

                    }
                </Col>

                {
                    messages.length > 0 ?
                        <Col xs={9} sm={9} lg={9} xl={9}>
                            <Row>
                                {
                                    messages.map(message => {
                                        return (
                                            // Each message can take full width of this new column on smaller screens,
                                            // or be part of a multi-column layout on larger screens if desired.
                                            // For now, let's make them stack vertically within the right column.
                                            // Or, if you want messages side-by-side within the right column:
                                            // <Col key={message.id} xs={12} md={6} lg={4}>
                                            <Col key={message.id} xs={12} sm={6} lg={4} xl={4}>
                                                <BadgerMessage {...message} handleDelete={handleDelete}/>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                            <Pagination>
                                {pages.map(page => <Pagination.Item key={page} active={page === curPage} onClick={() => { setCurPage(page) }}>{page}</Pagination.Item>)}
                            </Pagination>
                        </Col>
                        :
                        <Col xs={8} sm={8} lg={8} xl={8}>
                            <p>There are no messages on this page yet!</p>
                            <Pagination>
                                {pages.map(page => <Pagination.Item key={page} active={page === curPage} onClick={() => { setCurPage(page) }}>{page}</Pagination.Item>)}
                            </Pagination>
                        </Col>
                }
            </Row>
        </Container>

    </>
}
