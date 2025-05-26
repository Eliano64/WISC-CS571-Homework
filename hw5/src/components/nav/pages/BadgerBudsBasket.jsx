import { Container, Row } from "react-bootstrap"
import BadgerBudsSummary from "../cards/BadgerBudsSummary"
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"
import { useContext,useState, useEffect } from "react"

export default function BadgerBudsBasket(props) {
    const buds = useContext(BadgerBudsDataContext);
    const [displayBuds, setDisplayBuds] = useState([]);
    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds"))?? [];
        const adoptedCatIds = JSON.parse(sessionStorage.getItem("adoptedCatIds"))?? [];
        setDisplayBuds(buds.filter(bud =>savedCatIds.includes(bud.id) && !adoptedCatIds.includes(bud.id)));
    }, [buds]);

    const handleUnselect = (budId) => {
        setDisplayBuds(prev=>prev.filter(bud =>bud.id !==budId));
    }

    const handleAdopt = (budId) => {
        setDisplayBuds(prev=>prev.filter(bud =>bud.id !==budId));
    }

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        {displayBuds.length!==0?<Container fluid>
            <Row>
                {displayBuds.map(bud => <BadgerBudsSummary key={bud.id} {...bud} available={false} handleUnselect={handleUnselect} handleAdopt={handleAdopt}/>)}
            </Row>
        </Container>:<p>You have no buds in your basket!</p>}
    </div>
}