import axios from "axios";
import { createContext, useState, useEffect, ReactNode } from "react";

type UserDetails = {
  name: string;
  email: string;
  id: string;
  products: {}[];
};

type UserContextType = {
  user: UserDetails | null;
  setUser: React.Dispatch<React.SetStateAction<UserDetails | null>>;
  cartItem: number;
  setCartItem: React.Dispatch<React.SetStateAction<number>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
  cartItem: 0,
  setCartItem: () => null,
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [cartItem, setCartItem] = useState<number>(0);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, cartItem, setCartItem }}>
      {children}
    </UserContext.Provider>
  );
}
