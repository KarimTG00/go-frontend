import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import InscriptionVendeur from "./pages/InscriptionVendeur";
import InscriptionAmbassadeur from "./pages/InscriptionAmbassadeur";
import { useState } from "react";
import { AppContext } from "./components/appContext";
import Inscription from "./pages/inscription";
import UsersHome from "./pages/usersHome";
import Login from "./pages/login";
import DashboardVendor from "./pages/DashboardVendor";
import DashboardAmbassadeur from "./pages/DashboardAmbassadeur";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "seller",
        element: <DashboardVendor />,
      },
      {
        path: "ambassadeur",
        element: <DashboardAmbassadeur />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Inscription />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register-seller",
    element: <InscriptionVendeur />,
  },
  {
    path: "/register-ambassadeur",
    element: <InscriptionAmbassadeur />,
  },
  {
    path: "/user-home",
    element: <UsersHome />,
  },
]);

function App() {
  const [erreur, setErreur] = useState(false); // detecte s'il le remplissage du formulaire c'est fait correctement
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // etat du confirmPassword
  const [showPassword, setShowPassword] = useState(false); // detecte si le password est afficher ou pas
  const [categorie, setCategorie] = useState(); // contient le type de produit mis en avant par le vendeur

  const [selectedOption, setSelectedOption] = useState(""); // contient le type de vendeur du user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extraData, setExtraData] = useState();
  const [dataModal, setDatasModal] = useState({});
  const [userData, setUserData] = useState({}); // etat pour stocker les infos de l'utilisateur

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    setDatasModal({ ...values });
    setIsModalOpen(false);
  }; // fonction pour la soumission du formulaire modal

  function verifyPassword(password, confirmPassword) {
    return password === confirmPassword;
  } // function pour verifier la cohérence des passwords

  // functions pour masquer les passwords
  function visibleConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }
  function visiblePassword() {
    setShowPassword(!showPassword);
  }

  // gerent les erreurs sur les passwords
  function handleErrorPassword(e) {
    e.preventDefault();
    if (
      !verifyPassword(e.target.password.value, e.target.confirmPassword.value)
    ) {
      setErreur(true);
      return true;
    }
  }
  // functions pour soumettre le formulaire principale
  function handleSubmit(e) {
    e.preventDefault();
    setErreur(true);
  }
  return (
    <>
      {/* utilisation de context provider pour manipuler les données */}
      <AppContext.Provider
        value={{
          erreur,
          handleSubmit,
          verifyPassword,
          handleErrorPassword,
          visibleConfirmPassword,
          showConfirmPassword,
          visiblePassword,
          showPassword,
          handleModalSubmit,
          handleRadioChange,
          selectedOption,
          extraData,
          isModalOpen,
          setIsModalOpen,
          setExtraData,
          dataModal,
          categorie,
          setCategorie,
          userData,
          setUserData,
        }}
      >
        <div className="h-full w-full">
          <RouterProvider router={router} />
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
