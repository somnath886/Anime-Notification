import { useEffect, useState } from "react"
import {Card, Button} from "react-bootstrap"

const BaseUrl = 'https://api.jikan.moe/v3/'

const AnimeDataComponent = ({props}) => {

    const [Local, setLocal] = useState([])

    useEffect(() => {
        let x = localStorage.getItem("Anime")
        let y = JSON.parse(x)
        if (y != null) {
            setLocal(y)
        }
    }, [])

    function CheckDuplicate(title) {
        let inc = 0
        for (let i = 0; i < Local.length; i++) {
            console.log(Local[i][1])
            if (Local[i][1] === title) {
                inc++
            }
        }
        return inc
    }

    function AddToList(arr) {
        let title = arr[1]
        let Res = CheckDuplicate(title)
        if (Res > 0) {
            alert("Aleardy in the List")
        }
        else {
            fetch(`${BaseUrl}anime/${arr[2]}/episodes`)
            .then(res => res.json())
            .then(data => setLocal(p => [...p, [...arr, data.episodes_last_page]]))
        }
    }

    useEffect(() => {
        localStorage.setItem("Anime", JSON.stringify(Local))
    }, [Local])

    return (
        <>
            {props.map(p => (
                <Card key={p.mal_id} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={p.image_url} />
                    <Card.Body>
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>
                        {p.synopsis}
                    </Card.Text>
                    <Button onClick={() => {
                        AddToList([p.image_url, p.title, p.mal_id, p.airing])
                    }} variant="primary">Add</Button>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
}

export default AnimeDataComponent