type Props = {
  nombre : string;
  onClick: () => void;
}

function Boton({ nombre, onClick }: Props) {

    return (
        <button onClick={onClick}>
            {nombre}
        </button>
    )

}

export default Boton
