interface EmojiProps {
    label: string;
    symbol: string | undefined
}

function Emoji(props: EmojiProps) {
    return (
        <span 
            className="emoji"
            role="img"
            aria-label={props.label ? props.label : ""}
            aria-hidden={props.label ? "false" : "true"}
        >

        {props.symbol || props.symbol }
    
        </span>
    )
}

export default Emoji;