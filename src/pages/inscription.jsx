import { useContext } from "react";
import { AppContext } from "../components/appContext";
import { useNavigate } from "react-router-dom";
import FormWithModal from "../components/modalForm";

function Inscription() {
  const navigate = useNavigate();
  const {
    erreur,
    handleSubmit,
    handleErrorPassword,
    visibleConfirmPassword,
    showConfirmPassword,
    showPassword,
    visiblePassword,
    handleRadioChange,
    isModalOpen,
    dataModal, // information du formulaire secondaire
  } = useContext(AppContext);

  // tableau contenant les elements du formulaire modal
  async function PostElement(e) {
    //function pour pousser les données dans le serveur
    e.preventDefault();
    //post logic here
    const formData = new FormData(e.target);

    const values = Object.fromEntries(formData.entries());

    const playload = { ...values, ...dataModal }; // contient tout les informations du user

    try {
      const res = await fetch("http://localhost:8000/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playload), //add form data here
      });
      if (!res.ok) {
        const errorText = await res.text();
        return console.log(errorText);
      }
      const data = await res.json();
      console.log(data);
      navigate("/login");

      // on verifie le role du user pour le rediriger
      // if (data.role === "vendeur") {
      //   navigate("/login");
      // } else if (data.role === "ambassadeur") {
      //   navigate("/login");
      // } else {
      //   navigate("/user-home");
      // }
    } catch (error) {
      // on recupere les potentiel erreurs
      console.log(error);
      console.log("nous somme ici");
    }
  }

  console.log("voici le dataModal : ", dataModal);

  //icones pour masquer ou afficher le password

  const iconFalse = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
      className="size-6 focus:outline-none cursor-pointer"
      onClick={() => visibleConfirmPassword()}
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
      className="size-6 cursor-pointer"
      onClick={() => visibleConfirmPassword()}
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
  const iconPasswordFalse = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
      className="size-6 focus:outline-none cursor-pointer"
      onClick={() => visiblePassword()}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
  const iconPasswordTrue = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 cursor-pointer"
      onClick={() => visiblePassword()}
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
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-blue-50/40">
        <div className="border border-gray-300 p-4 bg-white rounded-lg shadow-lg flex flex-col gap-8 w-150">
          <div className="mx-auto">
            <h1 className="font-bold">Inscrivez vous</h1>
          </div>

          {/* Formulaire d'inscription user */}
          <div className="w-130 mx-auto relative">
            <form
              action=""
              className="text-xl flex flex-col gap-4"
              onSubmit={(e) => {
                if (handleErrorPassword(e)) return;
                PostElement(e);
              }}
            >
              <div className="flex bg-gray-50 p-3 rounded-xl font-semibold focus-within:ring-2 ring-blue-300">
                <label htmlFor="text" className="">
                  Nom complet :
                </label>
                <input
                  type="text"
                  id="text"
                  name="nom"
                  placeholder="entrer votre nom..."
                  className="outline-none ml-2 "
                  required
                  onInvalid={handleSubmit}
                />
              </div>
              <div className="bg-gray-50 p-3 rounded-xl font-semibold focus-within:ring-2 ring-blue-300">
                <label htmlFor="age" className="shrink-0 whitespace-nowrap">
                  Date de naissance :{" "}
                </label>
                <input
                  type="date"
                  id="age"
                  name="age"
                  className="outline-none border-0 ml-2"
                  required
                  onInvalid={handleSubmit}
                />
              </div>
              <div className="bg-gray-50 p-3 rounded-xl font-semibold focus-within:ring-2 ring-blue-300">
                <label
                  htmlFor="telephone"
                  className="shrink-0 whitespace-nowrap"
                >
                  telephone :{" "}
                </label>
                <input
                  type="number"
                  id="telephone"
                  name="telephone"
                  className="outline-none ml-2"
                  required
                  onInvalid={handleSubmit}
                />
              </div>
              <div className="bg-gray-50 p-3 rounded-xl font-semibold focus-within:ring-2 ring-blue-300 flex justify-between">
                <label htmlFor="password">Mot de passe : </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="outline-none"
                  required
                  onInvalid={handleSubmit}
                />
                {showPassword ? iconPasswordTrue : iconPasswordFalse}
              </div>
              <div className="bg-gray-50 p-3 rounded-xl font-semibold focus-within:ring-2 ring-blue-300 flex justify-between">
                <label htmlFor="confirmPassword">Confirmer : </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="outline-none"
                  required
                  onInvalid={handleSubmit}
                />
                {showConfirmPassword ? iconTrue : iconFalse}
              </div>
              <div className="flex flex-row justify-between bg-gray-50 p-3 rounded-xl font-semibold">
                <div className="flex ">
                  <label htmlFor="vendeur">Vendeur</label>
                  <input
                    type="radio"
                    id="vendeur"
                    name="choix"
                    value="vendeur"
                    className="ml-2 cursor-pointer"
                    required
                    onInvalid={handleSubmit}
                    onChange={handleRadioChange}
                  />
                </div>

                <div>
                  <label htmlFor="ambassadeur">Ambassadeur</label>
                  <input
                    type="radio"
                    id="ambassadeur"
                    name="choix"
                    value="ambassadeur"
                    className="ml-2 cursor-pointer"
                    required
                    onInvalid={handleSubmit}
                    onChange={handleRadioChange}
                  />
                </div>

                <div>
                  <label htmlFor="client">Client</label>
                  <input
                    type="radio"
                    id="client"
                    name="choix"
                    value="client"
                    className="ml-2 cursor-pointer"
                    required
                    onInvalid={handleSubmit}
                  />
                </div>
              </div>
              <button className="btnVendeur">Inscription</button>
              {erreur && (
                <p className="text-red-500 font-medium">
                  Veuillez remplir tous les champs et verifier que les mot de
                  passe sont identiques
                </p>
              )}

              <span>
                avez vous deja un compte?{" "}
                <a href="" className="underline text-blue-500 font-semibold">
                  connexion
                </a>
              </span>
            </form>
            {isModalOpen && <FormWithModal />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Inscription;
