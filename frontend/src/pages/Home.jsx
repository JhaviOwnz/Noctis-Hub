/**
 * Página inicial de la plataforma. Presenta un mensaje de bienvenida y
 * explica brevemente el propósito del sistema. Se podrá personalizar en
 * versiones futuras con widgets o un resumen de módulos activos.
 */
export default function Home() {
  return (
    <div>
      <h2>Welcome to Noctis Ops Hub</h2>
      <p>
        This is the starting point for your internal projects. From here you can
        create and manage mini‑projects like equipment planners, inspection lists or
        other operational tools. Use the navigation bar on the left to access
        future modules.
      </p>
    </div>
  );
}