import { coverGradient } from "../utils/format";
import { MusicIcon } from "./Icons";

// Capa gerada a partir do nome: o projeto não armazena imagens.
function Cover({ seed, size = "md", className = "" }) {
  return (
    <div
      className={`cover cover-${size} ${className}`}
      style={{ background: coverGradient(seed) }}
      aria-hidden="true"
    >
      <MusicIcon size={size === "xl" ? 48 : size === "sm" ? 14 : 20} />
    </div>
  );
}

export default Cover;
