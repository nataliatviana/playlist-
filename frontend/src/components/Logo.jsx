function Logo({ size = "md" }) {
  return (
    <span className={`logo logo-${size}`}>
      <img className="logo-mark" src="/logo.png" alt="" aria-hidden="true" />
      <span className="logo-text">
        Playlist<span className="logo-plus">+</span>
      </span>
    </span>
  );
}

export default Logo;
