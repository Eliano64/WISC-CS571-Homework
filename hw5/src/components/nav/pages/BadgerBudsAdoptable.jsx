import { useContext, useState, useEffect } from "react"
import BadgerBudsSummary from "../cards/BadgerBudsSummary";
import { Container, Row } from "react-bootstrap"; // Removed Col from here
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";

export default function BadgerBudsAdoptable(props) {
    const buds = useContext(BadgerBudsDataContext);
    

    const [displayBuds, setDisplayBuds] = useState([]);
    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds"))?? [];
        setDisplayBuds(buds.filter(bud => !savedCatIds.includes(bud.id)));
    }, [buds]);
    // console.log(savedCatIds);
    //console.log(buds.filter(bud =>!savedCatIds.includes(bud.id) ));

    const handleSave = (budId) => {
        setDisplayBuds(prev=>prev.filter(bud =>bud.id !==budId));
    }

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        {displayBuds.length!==0? <Container fluid>
            <Row>
                {/* Filter buds to exclude those whose IDs are in savedCatIds */}
                {displayBuds.map(bud => <BadgerBudsSummary key={bud.id} {...bud} available={true} handleSave={handleSave}/>)}
            </Row>
        </Container>: <p>No buds are available for adoption!</p>}
    </div>
}