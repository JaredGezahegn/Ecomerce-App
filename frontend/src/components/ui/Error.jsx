const Error = ({ error }) => {
    const message =
        typeof error === "string"
            ? error
            : error?.message || "Something went wrong";

    return (
        <div className="alert alert-danger my-5 text-center" role="alert">
            {message}
        </div>
    );
};

export default Error;
