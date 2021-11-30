import { useEffect, useRef } from "react";
import Game from "../game";

const GameContainer = () => {

    const canvasRef = useRef(null);
    // const [running, setRunning] 

    useEffect(() => {
        // if(!canvasRef.current) {
        //     return;
        // 

        console.log("running game")
        const game = new Game(canvasRef.current);

    }, [canvasRef]);


    return(
        <>
            <div style={{width: "100vw"}} ref={canvasRef}></div>
        </>
    )
};

export default GameContainer;