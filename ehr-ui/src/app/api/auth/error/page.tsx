import Link from "next/link"


const Error = () => {

    return (
        <>
            <h1>Oops! Something went wrong</h1>
            <Link href={"/doctor-login"}>Return to Login page</Link>
        </>
    )
}

export default Error