"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useAuth } from "@/hooks/useAuth";

import { Modal } from "@/components/ui/Modal";
import { User } from "@/services/AuthService";
import bannerLogin from "@/assets/banners/banner-login.png";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (email && password) {
      console.log("Login para:", email);

      const name = email.split("@")[0];
      const userToLogin: User = { name, email };

      login(userToLogin);
      onClose();

      router.push("/dashboard");
    } else {
      setError("Por favor, preencha ambos os campos.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className="max-w-96 mb-8">
          <Image
            src={bannerLogin}
            alt="Banner convidativo para entrar com sua conta"
            className="object-contain"
            priority
          />
        </div>

        <form className="mt-6 w-full text-left" onSubmit={handleLogin}>
          <label className="block">
            <span className="text-black font-bold text-base">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-zinc-500 shadow-sm h-12 px-4 bg-white text-zinc-500"
              placeholder="seu@email.com"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-black font-bold text-base">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-zinc-500 shadow-sm h-12 px-4 bg-white text-zinc-500"
              placeholder="Sua senha"
            />
          </label>

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}

          <div className="flex w-full justify-center p-4 mt-6">
            <button
              type="submit"
              className="w-36 h-12 rounded-md bg-success py-2 text-white hover:bg-black"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
