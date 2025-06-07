export const Login = () => {
  return (
    <section className="px-4 py-6 shadow-sm rounded-sm flex items-center flex-col">
      <h1 className="font-bold text-2xl">
        Welcome to{' '}
        <span className="font-extrabold bg-gradient-to-r from-red-400 to-orange-400  text-transparent bg-clip-text">
          projelyze.dev
        </span>
      </h1>
      <span className="font-light text-gray-600 font-sm text-sm">
        Please log in to continue
      </span>

      <div className="flex flex-col items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login with Google
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
          Login with GitHub
        </button>
      </div>
    </section>
  )
}
