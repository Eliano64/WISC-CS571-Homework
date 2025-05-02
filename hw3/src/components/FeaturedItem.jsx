import { useState, useEffect } from "react";
import {Button, Card, Table} from "react-bootstrap"

const Nutrition = (props)=>{
    return <>
        <h2 >Nutrition Facts</h2>
        <Table>
        <thead>
            <tr>
                <th>Calories</th>
                <th>Fat</th>
                <th>Carbohydrates</th>
                <th>Protein</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{props.calories??"0g"}</td>
                <td>{props.fat??"0g"}</td>
                <td>{props.carbohydrates??"0g"}</td>
                <td>{props.protein??"0g"}</td>
            </tr>
        </tbody>
        </Table>
    </>
}

export default function FeaturedItem(props) {
    const [buttonState, setButtonState] = useState(false);
    
    return <Card>
        {/* <p>I should display the feature that was passed to me...</p> */}
        <img src={props.img}/>
        <h1>{props.name}</h1>
        <h2>{props.price+" per unit"}</h2>
        <p>{props.description}</p>
        {buttonState?<Nutrition {...props.nutrition}/>:<></>}
        <Button onClick={()=> setButtonState(!buttonState)}  variant="info">{buttonState?"Hide Nutrition Facts":"Show Nutrition Facts"}</Button>
    </Card>
}