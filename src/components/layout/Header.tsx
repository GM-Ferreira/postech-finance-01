"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";

import { AuthService } from "@/services/AuthService";
import { RegistrationService } from "@/services/RegistrationService";

import { LogoIcon } from "../icons";
import { Modal } from "../ui/Modal";

import bannerSignUp from "@/assets/banners/banner-signup.png";

type LoggedInViewProps = {
  user: { name: string };
  onLogout: () => void;
};

type LoggedOutViewProps = {
  onLogin: () => void;
  onSignUp: () => void;
};

const LoggedInView: React.FC<LoggedInViewProps> = ({ user, onLogout }) => (
  <>
    <div className="flex items-center space-x-2">
      <span className="font-semibold text-white">Olá, {user.name}</span>
    </div>
    <button
      onClick={onLogout}
      className=" text-white px-4 py-2 rounded-md border-2 border-primary hover:border-warning transition-colors"
    >
      Sair
    </button>
  </>
);

const LoggedOutView: React.FC<LoggedOutViewProps> = ({ onLogin, onSignUp }) => (
  <>
    <button
      onClick={onSignUp}
      className="text-primary bg-secondary opacity-80 hover:opacity-100 px-4 py-2 rounded-md border-2"
    >
      Abrir minha conta
    </button>
    <button
      onClick={onLogin}
      className=" text-white px-4 py-2 rounded-md border-2 border-primary hover:border-white transition-colors"
    >
      Já tenho conta
    </button>
  </>
);

const Header = () => {
  const authService = useMemo(() => new AuthService(), []);
  const registrationService = useMemo(() => new RegistrationService(), []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState(registrationService.user);
  const [isTermsChecked, setIsTermsChecked] = useState(
    registrationService.termsAccepted
  );

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      await registrationService.submit();

      alert(`Conta para ${newUser.name} criada com sucesso! (Simulação)`);

      setIsModalOpen(false);
    } catch (err: unknown) {
      console.error("Erro no cadastro:", err);

      let errorMessage = "Não foi possível criar a conta. Tente novamente.";

      if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = String((err as { message: unknown }).message);
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-primary shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <LogoIcon className="text-white" />
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <LoggedInView
              user={{ name: "Guilherme" }}
              onLogout={() => authService.logout(setIsLoggedIn)}
            />
          ) : (
            <LoggedOutView
              onLogin={() => authService.login(setIsLoggedIn)}
              onSignUp={() => setIsModalOpen(true)}
            />
          )}
        </div>
      </nav>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center text-center h-full px-6">
          <div className="max-w-96 mb-8">
            <Image
              src={bannerSignUp}
              alt="Baner convidativo para a cadastrar uma conta "
              className="object-contain"
            />
          </div>

          <p className=" text-black text-xl font-bold">
            Preencha os campos abaixo para criar sua conta corrente!
          </p>

          <form className="mt-6 w-full text-left" onSubmit={handleSignUp}>
            <label className="block">
              <span className="text-black font-bold text-base">Nome</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-zinc-500 shadow-sm h-12 px-4 bg-white text-zinc-500"
                placeholder="Digite seu nome completo"
                value={newUser.name}
                onChange={(e) =>
                  registrationService.updateField(
                    "name",
                    e.target.value,
                    setNewUser
                  )
                }
              />
            </label>

            <label className="mt-4 block">
              <span className="text-black font-bold text-base">Email</span>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-zinc-500 shadow-sm h-12 px-4 bg-white text-zinc-500"
                placeholder="Digite seu email"
                value={newUser.email}
                onChange={(e) =>
                  registrationService.updateField(
                    "email",
                    e.target.value,
                    setNewUser
                  )
                }
              />
            </label>

            <label className="mt-4 block">
              <span className="text-black font-bold text-base">Senha</span>
              <input
                type={showPassword ? "text" : "password"}
                className="mt-1 block w-1/2 rounded-md border-zinc-500 shadow-sm h-12 px-4 bg-white text-zinc-500"
                placeholder="Digite sua senha"
                value={newUser.password}
                onChange={(e) =>
                  registrationService.updateField(
                    "password",
                    e.target.value,
                    setNewUser
                  )
                }
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-500 hover:text-zinc-700 ml-1"
              >
                Mostrar senha
              </span>
            </label>

            <label className="mt-4 block">
              <div className="flex py-3 flex-row items-center">
                <div className="w-[24px] h-[24px] flex-shrink-0">
                  <input
                    type="checkbox"
                    className="w-full h-full"
                    checked={isTermsChecked}
                    onChange={() =>
                      registrationService.toggleTerms(setIsTermsChecked)
                    }
                  />
                </div>

                <p className="text-zinc-500 ml-4 texte-base">
                  Li e estou ciente quanto às condições de tratamento dos meus
                  dados conforme descrito na Política de Privacidade do banco.
                </p>
              </div>
            </label>

            {error && <p className="mt-4 text-center text-warning">{error}</p>}

            <div className="flex w-full  justify-center p-4 mt-4">
              <button
                type="submit"
                className="w-36 h-12 rounded-md bg-warning py-2 text-white hover:bg-red-600 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isTermsChecked || isLoading}
              >
                {isLoading ? "Criando..." : "Criar conta"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
