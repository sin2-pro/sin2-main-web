import './App.css'

function App() {
  return (
    <main className="container">
      <header className="header">
        <h1>Sinthu S.</h1>
        <p className="tagline">Software Developer and Artist in Ontario, Canada</p>
      </header>
      
      <section className="about">
        <p>
          As a software developer and artist, I thrive on creation, experimentation, and continuous learning.
        </p>
        <p>
          My passion lies at the intersection of computer science and fine arts, where I explore innovative ways to bridge these disciplines.
        </p>
        <p>
          Through technology and the creative process, I aim to challenge perspectives, spark curiosity, and craft experiences that inspire thought and discovery.
        </p>
      </section>
      
      <nav className="social-links">
        <a href="https://github.com/sin2" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="http://www.linkedin.com/in/ssivapat" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:contact@sin2.ca">Email</a>
      </nav>
    </main>
  );
}

export default App;
