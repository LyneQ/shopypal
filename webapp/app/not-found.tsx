'use client';
export default function Custom404() {

    return (
        <div className={"error-box"}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button onClick={() => window.location.href = "/"}>Go to Home</button>
            <img src="https://fakeimg.pl/256" alt="404" />
        </div>
    )
}