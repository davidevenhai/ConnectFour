

function Player(props) {
    const players = props.player;
    const colors = props.colorArray;
    return(
        <div>

            {
                players.map((player)=>{
                    return(
                        <div>
                            <h2> Enter {player.text === 'playerOne' ? 'first player' : 'second player'} name</h2>
                            <label>Enter your name: </label>
                            <input value={player.name} onChange={(event)=>props.changeFunc(event,player.text,"name")}/>
                            <br/>
                            <label>Choose your color: </label>

                            <select value={player.color} onChange={(event)=>props.changeCol(event,player.text)}>
                                {colors.map((color)=> {
                                    return(
                                        <option>
                                            {color}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    )
                })
            }

        </div>
    )
}
export default Player;