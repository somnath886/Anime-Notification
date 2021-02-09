import { useEffect, useState } from "react"


const Animation = () => {

    const [redWidth, setRedWidth] = useState(0)
    const [greyWidth, setgreyWidth] = useState(600)
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (redWidth === 600 && greyWidth === 0) {
            setDone(true)
        } 
        const interval = setInterval(() => {
            if (redWidth < 600 && greyWidth > 0) {
                setRedWidth(p => p += 200)
                setgreyWidth(p => p -= 200)
            }
        }, 200)
        return () => clearInterval(interval)     
    }, [redWidth, greyWidth, done])

    console.log(redWidth, greyWidth)

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{backgroundColor: "red", height: 20, width: redWidth}}></div>
            <div style={{backgroundColor: "grey", height: 20, width: greyWidth}}></div>
            {done ? (<div>Done!</div>) : (<div>Loading...</div>)}
        </div>
    )
}

export default Animation