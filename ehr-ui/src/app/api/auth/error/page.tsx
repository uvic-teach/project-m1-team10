import { useRouter } from "next/navigation"

const errors = {
    Signin: "Try signing with a different account.",
    CredentialsSignin:
        "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
}

const Error = () => {

    //const router = useRouter()

    //const { error } = router.

    //const errorMessage = error && (errors[error as keyof typeof errors] ?? errors.default)

    return (
        <>
            <h1>Oops! Something went wrong</h1>
            <h2>{/*errorMessage*/}</h2>
        </>
    )
}

export default Error