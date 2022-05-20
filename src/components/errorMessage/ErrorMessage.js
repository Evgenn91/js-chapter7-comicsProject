import img from './error.gif';


const ErrorMessage = () => {
    return (
        //тут пример как что то достать из папки public(если бы в ней лежала наша гифка)
        //но ложат и потом что то используют из папки public очень редко
        // <img src={process.env.PUBLIC_URL + '/error.gif'} />

        //а это уже просто из нашей папки достаем
        <img style={{ display: 'block', width: "250px", height: "250px",
        objectFit: 'contain', margin: "0 auto"}} src={img} alt="Error"/>
    )
}

export default ErrorMessage;