export const GradientButton = ({ text, onClick = () => {}, type = 'btn_f', disabled = false }) => {

    const getStyleByType = () => {
        if (type === 'outlined') {
            return "btn_o"
        } else if(type === 'outlined w-100'){
            return "btn_o w-100"
        }  else if(type === "w-100") {
            return "btn_f w-100"
        }
        else return "btn_f"
    }

    return (
        <button className={type}
                onClick={onClick}
                disabled={disabled}
                data-text={text}
        >
        </button>
    )
}
