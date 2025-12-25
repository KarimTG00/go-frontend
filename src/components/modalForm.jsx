import { useContext, useState } from "react";
import { AppContext } from "./appContext";

export default function FormWithModal() {
  const {
    handleModalSubmit,
    setIsModalOpen,
    selectedOption,
    categorie,
    setCategorie,
  } = useContext(AppContext);
  const [selected, setSelected] = useState(false);
  const [error, setError] = useState(false); // etat pour gerer le remplissage incomplet du modalForm

  function pushError(e) {
    e.preventDefault();
    setError(true);
  }
  const tab = [
    {
      title: "Montres",
      id: 1,
      actif: false,
    },
    {
      title: "Outils menagers",
      id: 2,
      actif: false,
    },
    {
      title: "Vetements",
      id: 3,
      actif: false,
    },
    {
      title: "Outils electroniques",
      id: 4,
      actif: false,
    },
    {
      title: "telephones",
      id: 5,
      actif: false,
    },
    {
      title: "Prestation de service",
      id: 6,
      actif: false,
    },
    {
      title: "Voitures",
      id: 7,
      actif: false,
    },
    {
      title: "Nourritures",
      id: 8,
      actif: false,
    },
  ];
  const [options, setOptions] = useState(tab);
  function addCategorie(id) {
    const element = options.find((el) => el.id === id);
    setCategorie(element.title);
    setOptions(
      options.map((el) =>
        el.id === id ? { ...el, actif: !el.actif } : { ...el, actif: false }
      )
    );
  }
  function optChoisi() {
    const el = options.find((el) => el.actif === true);
    if (el) return el.title;
    else return;
  }
  console.log(options);
  console.log("voici la categorie", categorie);

  return (
    <div className="relative">
      {/* Overlay */}
      {selectedOption === "vendeur" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fond assombri */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-50 w-full max-w-xl max-h-max rounded-2xl bg-white p-6 px-15 shadow-xl">
            <div className="mb-4 w-full">
              <h2 className="font-semibold text-3xl mx-auto">
                Devenez Vendeur
              </h2>
              <p className="text-xl mx-auto">
                Parlez nous de votre business !{" "}
              </p>
            </div>

            <form
              onSubmit={handleModalSubmit}
              className="space-y-4 flex flex-col gap-2"
            >
              <div className="flex justify-between bg-gray-100 p-2 text-xl rounded-2xl gap-2 border border-blue-600/40 relative">
                <input
                  type="text"
                  name="activite"
                  placeholder="Vous vendez quoi ?"
                  className="focus:outline-none"
                  value={optChoisi() || ""}
                  required
                  onInvalid={pushError}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                  onClick={() => setSelected(!selected)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
                {selected && (
                  <div className="absolute top-full right-0 z-50 mt-2 bg-white p-2 rounded-2xl shadow w-full overflow-scroll h-80 transition-normal border-black border ml-10">
                    <div className="px-3 py-2 font-semibold text-2xl">
                      Choisissez une option
                    </div>
                    <ul className="px-3 py-2 cursor-pointer p-2 rounded-xl mx-2 flex flex-col gap-4">
                      {options.map((el) => (
                        <li
                          key={el.id}
                          className={`${
                            el.actif === true
                              ? "bg-blue-400 text-white font-semibold"
                              : "bg-gray-100"
                          } px-3 py-2 cursor-pointer p-2 rounded-xl mx-2 hover:bg-blue-400 hover:text-white hover:font-semibold`}
                          onClick={() => addCategorie(el.id)}
                        >
                          {el.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <input
                type="number"
                name="telephone"
                placeholder="Telephone exemple: 6XXXXXXXX"
                className="w-full focus:outline-none border border-blue-600/40 p-2 rounded-xl text-xl"
                required
                onInvalid={pushError}
              />
              <input
                type="text"
                placeholder="Ville ex: Douala"
                className="w-full rounded-xl p-2 text-xl focus:outline-none border border-blue-600/40"
                name="adresse"
                required
                onInvalid={pushError}
              />
              {error && (
                <p className="text-red-500 text-xl">
                  Veuillez remplir tous les champs.
                </p>
              )}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg px-4 py-2 bg-blue-600 text-lg cursor-pointer text-white font-semibold"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 cursor-pointer font-semibold px-4 py-2 text-lg text-white"
                >
                  continuer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* modalForm pour l'ambassadeur */}

      {selectedOption === "ambassadeur" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fond assombri */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-50 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className=" mb-2  text-xl">
              <h3 className="text-2xl font-semibold">Devenez ambassadeur</h3>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <label htmlFor="adresse" className="text-xl font-medium">
                Adresse :
              </label>
              <input
                type="text"
                placeholder="ex: Douala"
                className="w-full rounded-lg  p-1 mt-1 focus:outline-none border border-blue-400 text-xl"
                id="adresse"
                name="adresse"
                required
                onInvalid={pushError}
              />
              {error && (
                <p className="text-red-500 text-xl">
                  Veuillez remplir tous les champs.
                </p>
              )}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg px-4 py-2 bg-blue-600 text-lg cursor-pointer text-white font-semibold"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 cursor-pointer font-semibold px-4 py-2 text-lg text-white"
                >
                  continuer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
