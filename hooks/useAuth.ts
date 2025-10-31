"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("adminToken");
      
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const res = await fetch("/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Invalid token");
        }

        setAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [router]);

  return { loading, authenticated };
}

export function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
