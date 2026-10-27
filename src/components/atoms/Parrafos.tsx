type ParrafoProps = {
    texto: string
}

function Parrafos({ texto }: ParrafoProps) {
    return (
        <p>
            {texto}
        </p>
    )
}
export default Parrafos