import { useState, useEffect } from "react"
import { Container, Card } from "react-bootstrap"

const Fav = () => {

    const [Data, setData] = useState()

    if (process.browser) {
        useEffect(() => {
            let x = localStorage.getItem("Anime")
            let y = JSON.parse(x)
            setData(y)
        }, [localStorage.getItem("Anime")])
    }

    return (
        <Container>
            {Data != undefined ? Data.map(a => (
                <Card key={a[2]} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={a[0]}/>
                    <Card.Body>
                    <Card.Title>{a[1]}</Card.Title>
                    </Card.Body>
                </Card>
            )) : null}
        </Container>
    )
}

export default Fav