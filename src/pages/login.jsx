import { useContext, useState } from "react";
import dealoLogo from "../assets/dealo.png";
import Footer from "../components/Footer";
import { AppContext } from "../components/appContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [error, setError] = useState(false); // gere l'erreur sur le remplissage du formulaire
  const [message, setMessage] = useState("telephone ou mot de passe incorrect");

  const navigate = useNavigate();
  const { setUserData } = useContext(AppContext);
  const [icon, setIcon] = useState(false);
  function HideOrSee() {
    setIcon(!icon);
  }
  function handleError(e) {
    e.preventDefault();
    setError(true);
  }
  async function hanldeSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    // handle logic login
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        if (!res.status !== 200) {
          const data = await res.json();
          setMessage(data.msg);
          setError(true);
          return;
        }
        const data = await res.text();
        console.log("une erreur lors du fetch : ", data);
        return;
      }

      const data = await res.json();
      setUserData(data);

      localStorage.setItem("accessToken", data.accessToken); // sauvegarde du jwt token dans le localStorage

      // redirection
      if (data.role === "vendeur") {
        navigate("/dashboard/seller");
      } else if (data.role === "ambassadeur") {
        navigate("/dashboard/ambassadeur");
      } else if (data.role === "client") {
        navigate();
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const iconFalse = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
      className="size-6 focus:outline-none cursor-pointer m-3"
      onClick={HideOrSee}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );

  const iconTrue = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
      onClick={HideOrSee}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );

  return (
    <>
      <div className="h-full">
        <div className="bg-blue-50/40 w-full h-full flex items-center justify-center">
          <div className="m-4 w-180">
            <img src={dealoLogo} alt="" className="w-90 mb-7" />
            <h3 className="text-3xl">
              avec <strong>Dealo</strong> , augmentez votre visibilité en meme
              temps que vos profits
            </h3>
          </div>
          <div className="bg-white w-150 p-4 rounded-xl m-4 shadow-lg">
            <h3 className="text-3xl font-semibold text-center">Connexion</h3>
            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={(e) => hanldeSubmit(e)}
            >
              <div>
                <br />
                <input
                  type="number"
                  id="telephone"
                  className="w-full bg-gray-50/40 p-3 text-xl rounded-xl border border-gray-400 focus:outline-none focus:border-blue-400"
                  placeholder="telephone"
                  name="telephone"
                  required
                  onInvalid={handleError}
                />
              </div>
              <div className="flex bg-gray-50/40  text-xl rounded-xl border-gray-400 focus:outline-none justify-center border items-center">
                <input
                  type={icon ? "text" : "password"}
                  id="password"
                  placeholder="Mot de passe "
                  className="w-full focus:outline-none h-full  p-3 "
                  required
                  name="password"
                  onInvalid={handleError}
                />
                <div className="">{icon ? iconTrue : iconFalse}</div>
              </div>

              <p className="">
                <a href="" className="text-blue-600 text-lg">
                  Mot de passe oublié ?
                </a>
              </p>
              {error && <p className="text-red-500 text-xl">{message}</p>}
              <div className="border border-transparent border-b-gray-400 ">
                <button
                  type="submit"
                  className="text-2xl bg-blue-400 text-white p-2 rounded-xl px-3 w-full cursor-pointer border hover:bg-blue-400/90 mb-6"
                >
                  Connexion
                </button>
              </div>
            </form>
            <div className="mt-4">
              <p className="text-xl mb-3">
                Vous n'avez pas encore de compte ? inscrivez vous
              </p>
              <button className="text-2xl bg-gray-900 text-white p-4 rounded-xl px-3 block mx-auto w-80 cursor-pointer border hover:bg-gray-900/90 my-5">
                Créer Un Compte
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
