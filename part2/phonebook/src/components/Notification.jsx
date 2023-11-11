const Notification = ({ message, className }) => message && (
    <div className={className} >
        <p>{message}</p>
    </div>
)

export default Notification