import { useEffect, useState } from "react"
import {Container, FormControl, InputGroup, Button, Toast} from "react-bootstrap"

import AnimeDataComponent from "../components/animeDataComponent"
import SvgComponent from "../components/svgBell"

const BaseUrl = 'https://api.jikan.moe/v3/'
const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const Anime = () => {

    const [Query, setQuery] = useState("")
    const [AnimeData, setAnimeData] = useState([])
    const [Notification, setNotification] = useState([])
    const [Not, setNot] = useState(false)
    const [Data, setData] = useState([])
    const [Schedule, setSchedule] = useState()

    if (process.browser) {
        useEffect(() => {
            let x = localStorage.getItem("Anime")
            let y = JSON.parse(x)
            setData(y)
            if (Data.length > 0) {
                let day = WeekDays[new Date().getDay() - 1].toLowerCase()
                fetch(`${BaseUrl}schedule/${day}`)
                .then(res => res.json())
                .then(data => setSchedule(data[day]))
            }
        }, [localStorage.getItem("Anime")])
    }

    useEffect(() => {
        if (Schedule != undefined) {
            let arr = []
            for (let i = 0; i < Schedule.length; i++) {
                arr.push(Schedule[i])
            }
            setNotification(arr)
        }
    }, [Schedule])

    console.log(Notification)
    
    function searchAnime() {
        fetch(`${BaseUrl}search/anime?q=${Query}&page=1`)
        .then(res => {
            if (res.ok){
                res.json()
                .then(data => setAnimeData(data.results))
            }   
            else {
                alert("Not Found")
            }
        })
    }
    
    function ShowNotification() {
        setNot(p => !p)
    }

    function ChangeQuery(e) {
        setQuery(e.target.value)
    }

    return (
        <>
            <Container>
                <div style={{display: "flex", justifyContent: "center", alignContent: "center", marginLeft: 60, border: 'solid white 1px', backgroundColor: "red", height: 20, width: 20, position: "absolute", color: "white"}}>{Notification.length}</div>
                <div>
                    <Button onClick={ShowNotification} style={{backgroundColor: "yellow"}}><SvgComponent style={{backgroundColor: "yellow"}}/></Button>
                </div>
                <Container style={{zIndex: 1, position: "absolute"}}>
                    {Not ? Notification.length > 0 ? Notification.map((a, i) =>  (
                        <Toast key={i}>
                            <Toast.Header>
                            <strong className="mr-auto">{a.title}</strong>
                            <Toast.Body>Episode Dropping Today!</Toast.Body>
                            </Toast.Header>
                        </Toast>
                    )):(
                        <Toast>
                            <Toast.Header>
                            <strong className="mr-auto">Bootstrap</strong>
                            <Toast.Body>Nothing to Show!</Toast.Body>
                            </Toast.Header>
                        </Toast>
                    ): null}
                    
                </Container>
            </Container>
            <Container>
                <h1>Search Anime</h1>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={Query}
                    onChange={ChangeQuery}
                    />
                    <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={searchAnime}>Button</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Container>
            <Container>
                <AnimeDataComponent props={AnimeData}/>
            </Container>
        </>
    )
}

export default Anime