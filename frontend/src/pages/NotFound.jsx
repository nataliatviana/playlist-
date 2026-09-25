import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

function NotFound() {
  return (
    <div className="page">
      <EmptyState title="Página não encontrada">
        <p>
          <Link to="/">Voltar ao início</Link>
        </p>
      </EmptyState>
    </div>
  );
}

export default NotFound;
