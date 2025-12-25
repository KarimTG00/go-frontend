import { useNavigate } from "react-router-dom";

export default function BodyHome() {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-full mx-auto px-40 pt-30 relative space-y-10">
        <div className="relative text-white font-bold">
          <div className="w-300">
            <h1 className="h1Home">
              Vous souhaitez augmenenter la visibilité de votre business ou meme
              directement gagner de l'argent en devenant ambassadeur ? Bienvenue
              sur Dealo.
            </h1>
          </div>
          <div className="flex gap-10">
            <div className="bg-black w-150 p-10 space-y-5 rounded-lg mt-10">
              <h2 className="text-3xl">Devenez Vendeur</h2>
              <p className="text-xl">
                postez les annonces de vos produits et laissez nos ambassadeur
                faire la publicité !
              </p>
              <button
                className="hover:bg-black/10 cursor-pointer btnDefault"
                onClick={() => navigate("/register")}
              >
                <span className="text-black text-lg font-bold">
                  Devenir Vendeur
                </span>
              </button>
            </div>
            <div className="bg-gray-400 w-150 p-10 space-y-5 rounded-lg mt-10">
              <h2 className="text-3xl">Devenez Ambassadeur</h2>
              <p className="text-xl">
                Gagner de l'argent en partageant les annonces de produits.
              </p>
              <button
                className="hover:bg-black/10 btnDefault"
                onClick={() => navigate("/register-ambassadeur")}
              >
                <span className="text-black text-lg font-bold">
                  Devenir ambassadeur
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
