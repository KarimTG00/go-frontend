// import { useNavigate } from "react-router-dom";

import useAuthorization from "../components/authorizHook";

export default function DashboardVendor() {
  const { authorized, loading, error } = useAuthorization();
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (authorized) return <p>Non autorisé</p>;

  return (
    <>
      <h1>Dashboard Vendeur</h1>
    </>
  );
}
