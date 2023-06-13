function ErrorPage() {
    return (
        <div className="error-page flex flex-col items-center justify-center h-screen bg-gray-200">
            <h1 className="text-4xl font-bold text-details mb-4">404 Error</h1>
            <p className="text-lg text-main">
                Oops! The page you're looking for doesn't exist.
            </p>
        </div>
    )
}

export default ErrorPage
