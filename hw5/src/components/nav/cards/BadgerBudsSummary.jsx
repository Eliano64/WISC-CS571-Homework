import { Button, Card, Col, Carousel } from "react-bootstrap"
import { useState } from "react";


const BadgerBudsSummary = (props) => {
    const src_base = "https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/";
    const [showMore, setShowMore] = useState(false);


    const triggerShowMore = () => {
        setShowMore(!showMore);
    }

    const showContent = () => {
        return <>
            <p>{props.gender + "\n"}</p>
            <p>{props.breed + "\n"}</p>
            <p>{props.age + "\n"}</p>
            <p>{props.description ?? ""}</p>
        </>
    }

    const save = () => {
        alert(`${props.name} has been added to your basket!`);
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) ?? [];
        savedCatIds.push(props.id);
        sessionStorage.setItem("savedCatIds", JSON.stringify(savedCatIds));
        console.log(savedCatIds);
        props.handleSave(props.id);
    }

    const unselect = () => {
        alert(`${props.name} has been removed from your basket!`);
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) ?? [];
        const index = savedCatIds.indexOf(props.id);
        if (index !== -1) {
            savedCatIds.splice(index, 1); // 
        }
        sessionStorage.setItem("savedCatIds", JSON.stringify(savedCatIds));
        props.handleUnselect(props.id);
    }

    const adopt = () => {
        alert(`Thank you for adopting ${props.name}!`);
        const adoptedCatIds = JSON.parse(sessionStorage.getItem("adoptedCatIds")) ?? [];
        adoptedCatIds.push(props.id);
        sessionStorage.setItem("adoptedCatIds", JSON.stringify(adoptedCatIds));
        props.handleAdopt(props.id);
    }


    return <Col xs={12} sm={6} lg={3} xl={3} className="mb-4">
        <Card className="">
            {showMore ? <Carousel>
                {props.imgIds.map(img => (
                    <Carousel.Item key={img}>
                        <img
                            src={src_base + img}
                            alt={img}
                            style={{ height: '400px', aspectRatio: '1/1', objectFit: 'cover' }}
                        />
                    </Carousel.Item>
                ))}
            </Carousel> : <img
                alt={props.name}
                src={src_base + props.imgIds[0]}
                style={{ height: '400px', aspectRatio: '1/1', objectFit: 'cover' }}
            />}
            <Card.Body className="">
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {showMore ? showContent() : <></>}
                    <hr />
                    {props.available ? <>
                        <Button variant="primary" className="me-1 " onClick={triggerShowMore}>{showMore ? "Show less" : "Show More"}</Button>
                        <Button variant="secondary" className="ms-1 " onClick={save}>❤️ Save</Button>
                    </>
                        : <>
                            <Button variant="secondary" className="me-1 " onClick={unselect} >Unselect</Button>
                            <Button variant="success" className="ms-1 " onClick={adopt}>💕 Adopt</Button>
                        </>
                    }
                </Card.Text>
            </Card.Body>
        </Card>

    </Col>
}


export default BadgerBudsSummary;