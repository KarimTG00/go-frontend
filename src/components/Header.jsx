export default function Header() {
  return (
    <>
      <header className="p-0 md:p-10 md:px-13 relative">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-700">Logo</h1>

          {/* Menu caché sur petit écran */}
          <ul className="hidden md:flex space-x-5 text-xl bg-white p-4 rounded-full shadow-xl">
            <li className="hover:underline">
              <a href="">Accueil</a>
            </li>
            <li className="hover:underline">
              <a href="">Nous contacter</a>
            </li>
            <li className="hover:underline">
              <a href="">Comment ça marche ?</a>
            </li>
            <li className="hover:underline">
              <a href="">Blog</a>
            </li>
          </ul>

          <div className="space-x-4 flex items-center justify-center">
            <div>
              <button className="flex space-x-2 justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <span className="text-xl">Connecter vous</span>
              </button>
            </div>
            <button>
              <span className="text-xl">Inscrivez vous</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
