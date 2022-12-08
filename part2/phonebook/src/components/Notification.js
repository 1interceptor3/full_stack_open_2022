const Notification = ({ message, error=false }) => {
    if (message === null) {
        return null
    }
    const style = error ? {color: "red"} : {}

    return (
        <div className="message" style={style}>
            {message}
        </div>
    )
}

export default Notification;