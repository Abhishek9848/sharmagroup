"use client";

import { createContext, useContext, useEffect, useState } from "react";

type StateContextType = {
  currentColor: string;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
  setColor: (color: string) => void;
  currentProfile: string;
  setProfile: (value: string) => void;
  setCurrentProfile: React.Dispatch<React.SetStateAction<string>>;
  handleSignOut: () => void;
};

const StateContext = createContext<StateContextType | null>(null);

export function useStateContext() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
}

export function StateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentProfile, setCurrentProfile] = useState("sharmaRoadLines");

  useEffect(() => {
    const profile = localStorage.getItem("currentProfile");
    if (profile) setCurrentProfile(profile);
  }, []);

  const setProfile = (value: string) => {
    setCurrentProfile(value);
    localStorage.setItem("currentProfile", value);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleSignOut = () => {
    localStorage.removeItem("currentProfile");
  };

  return (
    <StateContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        setColor,
        currentProfile,
        setProfile,
        setCurrentProfile,
        handleSignOut,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
