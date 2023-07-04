function Landing() {
    return (
        <div className="bg-black">
            <h1 className="landing-title">Welcome to the <span className="landing-title-accent">MERN</span> Stack</h1>
            <h2 className="landing-subtitle">A simple MERN stack boilerplate</h2>
            <div className="landing-buttons">
                <a href="/login" className="landing-button">Login</a>
                <a href="/register" className="landing-button">Register</a>
            </div>
        </div>
    );
}

export default Landing;