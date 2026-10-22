import './Hero.css'

function Hero() {
  return (
    <header className="hero">
      <div className="container">
        <p className="hero__eyebrow">Software Developer · Open to remote roles</p>
        <h1 className="hero__name">Mel Liza Limbago</h1>
        <p className="hero__headline">
          Computer Engineering graduate and former ICT teacher building web
          apps with Django and React.
        </p>
        <p className="hero__tagline">I love to create whimsical things.</p>

        <nav className="hero__links" aria-label="Primary links">
          <a className="button button--primary" href="#projects">
            View projects
          </a>
          <a className="button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Résumé (PDF)
          </a>
          <a
            className="button"
            href="https://github.com/fullstackbyMel"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="button"
            href="https://linkedin.com/in/melthecoder31"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Hero