import { useState, useEffect } from "react";

function useAuthorization() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function authorization() {
      try {
        console.log("on est ici");
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setError("Token manquant");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:8000/dashboardSeller", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            const data = await res.json();
            setError(data.msg || "Non autorisé");
          } else {
            const data = await res.text();
            setError(data);
          }
          setAuthorized(false);
        } else {
          const data = await res.json();
          console.log(data); // pour debug
          setAuthorized(true);
        }
      } catch (err) {
        console.error("Une erreur :", err.message);
        setError(err.message);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    authorization();
  }, []);

  return { authorized, loading, error };
}

export default useAuthorization;
