import SignInButton from "./providers/github-button";

export default function SignInPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-8">Log in to Bloom</h1>
            <div className="w-full max-w-md">
                <SignInButton />
            </div>
        </main>
    );
}