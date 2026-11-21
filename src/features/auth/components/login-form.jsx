export default function LoginForm() {
    return (
        <div className="sm:w-1/2 p-2 flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl mb-2">Sign In</h1>
            <p className="text-center">
                If you are having an account, Please Log in!
            </p>
            <form action="" className="mt-10 flex flex-col justify-center">
                <input
                    type="email"
                    placeholder="abc@example.com"
                    required
                    className="p-2 bg-[#3c364c] rounded-xl mb-4 focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="*****"
                    required
                    className="p-2 bg-[#3c364c] rounded-xl mb-4 focus:outline-none"
                />
                <button className="block bg-[#6d54b5] p-2 rounded-xl hover:bg-[#a47ce5] transition active:scale-90">
                    Sign in
                </button>
            </form>
        </div>
    );
}
