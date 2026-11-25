import { Form, Link } from "react-router";

export default function SignupForm() {
    return (
        <div className="sm:w-1/2 p-2 flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl mb-2">Create account</h1>
            <p className="text-center">Let&apos;s get you set up with EduVverse Drive!</p>
            <Form method="post" className="mt-8 flex flex-col justify-center">
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First name"
                        className="p-2 bg-[#3c364c] rounded-xl mb-4 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last name"
                        className="p-2 bg-[#3c364c] rounded-xl mb-4 focus:outline-none"
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="abc@example.com"
                    required
                    className="p-2 bg-[#3c364c] rounded-xl mb-4 focus:outline-none"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="*****"
                    required
                    minLength={8}
                    className="p-2 bg-[#3c364c] rounded-xl mb-4 focus:outline-none"
                />
                <button className="block bg-[#6d54b5] p-2 rounded-xl hover:bg-[#a47ce5] transition active:scale-90">
                    Sign up
                </button>
            </Form>
            <p className="mt-6 text-sm text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-[#a47ce5] hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    );
}
