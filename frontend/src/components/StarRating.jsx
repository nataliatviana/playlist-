import { useState } from "react";
import { StarIcon } from "./Icons";

function StarRating({ value, onRate }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className="stars" onMouseLeave={() => setHover(0)} role="group" aria-label="Avaliação">
      {[1, 2, 3, 4, 5].map((score) => (
        <button
          key={score}
          type="button"
          className={`star ${score <= shown ? "on" : ""}`}
          onMouseEnter={() => setHover(score)}
          onClick={(event) => {
            event.stopPropagation();
            onRate(score);
          }}
          aria-label={`${score} de 5`}
          aria-pressed={score === value}
          title={score === value ? "Clique para remover a avaliação" : `Avaliar com ${score}`}
        >
          <StarIcon size={14} filled={score <= shown} />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
