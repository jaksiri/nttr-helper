import { registerAction } from "../action";

function SignUp() {
  return (
    <div className="p-4">
      <h2>Register</h2>
      <form action={registerAction}>
        <div className="mb-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="bg-transparent border border-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="bg-transparent border border-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="bg-transparent border border-white"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SignUp;
