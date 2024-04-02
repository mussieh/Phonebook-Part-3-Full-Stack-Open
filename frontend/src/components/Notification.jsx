const Notification = ({ message, visibility, isSuccessMessage }) => {
    if (message === null || !visibility) {
        return null;
    }

    return (
        <div
            className={
                isSuccessMessage
                    ? "success-message-container"
                    : "error-message-container"
            }
        >
            {message}
        </div>
    );
};

export default Notification;
