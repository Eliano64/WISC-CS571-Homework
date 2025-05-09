import { Col } from "react-bootstrap";

const Interest = (props) => {
    return <li>{props.interest}</li>
}

const Student = (props) => {
    return <>
        <Col xs={12} sm={12} md={6} lg={4} xl={3}>
            <h2>{props.name.first} {props.name.last}</h2>
            <strong>{props.major}</strong>
            <p>{props.name.first} is taking {props.numCredits} credits and is {props.fromWisconsin ? "" : "NOT "}from Wisconsin.</p>
            <p></p>
            <p>They have {props.interests.length} interests including...</p>
            <ul>
                {props.interests.map(interest => <Interest interest={interest} key={interest} />)}
            </ul>
            {/*  Student data goes here! */}
        </Col>
    </>
}



export default Student;