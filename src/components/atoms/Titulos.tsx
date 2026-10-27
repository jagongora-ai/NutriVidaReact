type TituloProps = {
    texto : string
}
function Titulos({texto} : TituloProps){
    return(
        <h1>
            {texto}
        </h1>
    )
}
export default Titulos