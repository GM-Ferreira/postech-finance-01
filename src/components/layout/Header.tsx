"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoIcon } from "../icons";

type User = {
  name: string;
};

type LoggedInViewProps = {
  user: User;
  onLogout: () => void;
};

type LoggedOutViewProps = {
  onLogin: () => void;
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

const LoggedOutView: React.FC<LoggedOutViewProps> = ({ onLogin }) => (
  <>
    <button className="text-primary bg-secondary opacity-80 hover:opacity-100 px-4 py-2 rounded-md border-2">
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = { name: "Guilherme" };

  return (
    <header className="bg-primary shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <LogoIcon className="text-white" />
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <LoggedInView user={user} onLogout={() => setIsLoggedIn(false)} />
          ) : (
            <LoggedOutView onLogin={() => setIsLoggedIn(true)} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
