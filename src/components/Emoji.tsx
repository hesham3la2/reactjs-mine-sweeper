import { ActionTypes, GameStatus } from "../context/enums";
import { useMain } from "../context/MainContextProvider";

interface EmojiProps {
    label: string;
    symbol: string | undefined
}

function Emoji(props: EmojiProps) {

    const {state, dispatch} = useMain();

    const emojiOnClick = () => {
        if(state.gameStatus !== GameStatus.Paused)
        dispatch({type: ActionTypes.RESTARTGAME, payload: state.level.name})
        else
        dispatch({type: ActionTypes.GAMERESTORED})
    }
    
    return (
        <span 
            className="emoji"
            role="img"
            onClick={() => emojiOnClick()}
            aria-label={props.label ? props.label : ""}
            aria-hidden={props.label ? "false" : "true"}
        >

        {props.symbol || props.symbol }
    
        </span>
    )
}

export default Emoji;