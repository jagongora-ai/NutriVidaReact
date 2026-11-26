import { useEffect, useId, useRef, type ReactNode } from 'react';

type AlertDialogProps = {
    abierto: boolean
    titulo: string
    descripcion?: string
    alCerrar: () => void
    acciones?: ReactNode
    children: ReactNode
}

function AlertDialog({ abierto, titulo, descripcion, alCerrar, acciones, children }: AlertDialogProps) {
    const refDialogo = useRef<HTMLDivElement>(null);
    const idTitulo = useId();
    const idDescripcion = useId();

    useEffect(() => {
        if (!abierto) return;
        refDialogo.current?.focus({ preventScroll: true });
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [abierto]);

    useEffect(() => {
        if (!abierto) return;
        const cerrarConEscape = (evento: KeyboardEvent) => {
            if (evento.key === 'Escape') alCerrar();
        };
        document.addEventListener('keydown', cerrarConEscape);
        return () => document.removeEventListener('keydown', cerrarConEscape);
    }, [abierto, alCerrar]);

    if (!abierto) return null;

    return (
        <div className="dialog-overlay" role="presentation">
            <div
                ref={refDialogo}
                className="dialog-box"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={idTitulo}
                aria-describedby={descripcion ? idDescripcion : undefined}
                tabIndex={-1}
            >
                <header className="dialog-header">
                    <span className="dialog-icon" aria-hidden="true">✓</span>
                    <div>
                        <h2 id={idTitulo}>{titulo}</h2>
                        {descripcion && <p id={idDescripcion}>{descripcion}</p>}
                    </div>
                </header>

                <div className="dialog-body">{children}</div>

                {acciones && <footer className="dialog-actions">{acciones}</footer>}
            </div>
        </div>
    );
}

export default AlertDialog;
