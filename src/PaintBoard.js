import './PaintBoard.css';

function PaintBoard(props) {
    const board = props.board;
    return (
        <div className={"board"}>
            {board.map((row)=> {
                return(
                    <div>
                        {row.map((col)=>{
                           return(
                               <button style={{backgroundColor:col.color}}
                                       onClick={()=>props.userClick(col.col)}
                                       className={"myButtons"}></button>
                           )
                        })}
                    </div>
                )
            })}

        </div>
    )
}

export default PaintBoard;