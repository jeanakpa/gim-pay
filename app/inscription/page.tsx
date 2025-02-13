"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Inscription() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+225", // Côte d'Ivoire par défaut
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const response = await fetch("http://192.168.77.195:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.email,
        password: formData.password,
      }),
      credentials: "include",
    });

    setLoading(false);
    if (response.ok) {
      router.push("/login");
    } else {
      const data = await response.json();
      setError(data.message || "Une erreur est survenue");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 max-w-md w-full border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center text-white">Créer un compte</h2>
        <p className="text-center text-gray-300 mb-6">Rejoignez-nous dès maintenant !</p>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Nom complet"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/30 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/30 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-white"
            required
          />
          <div className="flex space-x-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="w-1/3 px-4 py-3 bg-white/30 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
            >
              <option value="+225">🇨🇮 +225</option>
              <option value="+226">🇧🇫 +226</option>
            </select>
            <input
              type="text"
              name="phone"
              placeholder="Numéro de téléphone"
              value={formData.phone}
              onChange={handleChange}
              className="w-2/3 px-4 py-3 bg-white/30 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-white"
              required
            />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Mot de passe (8 caractères min.)"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/30 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-white"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmez le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/30 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-white"
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white text-lg font-bold transition-all ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </Button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          Vous avez déjà un compte ?
          <a href="/login" className="text-blue-300 hover:underline ml-1">
            Connectez-vous
          </a>
        </p>
      </motion.div>
    </div>
  );
}
