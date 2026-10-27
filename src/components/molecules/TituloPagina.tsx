type Props = { titulo: string; descripcion?: string }

// Muestra el título y la descripción al inicio de una página.
export default function TituloPagina({ titulo, descripcion }: Props) {
    return (<div className="page-heading">
      <h1>{titulo}</h1>
      {descripcion && <p>{descripcion}</p>}
    </div>);
}