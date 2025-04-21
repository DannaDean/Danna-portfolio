const Form = ({ action, className, onSubmit,  children }) => {
    return (
        <form action={action} className={className} onSubmit={onSubmit}>
             {children}
        </form>
    );
}

export default Form;