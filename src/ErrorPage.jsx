import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full sm:w-1/2 px-4">
                <h1 className="text-3xl font-semibold">Ooops!</h1>
                <p className="mt-2 text-sm">Sorry, something went wrong.</p>
                <p className="mt-8 text-xs italic text-gray-400">{error.statusText || error.message}</p>
            </div>
        </div>
    );
}

export default ErrorPage;