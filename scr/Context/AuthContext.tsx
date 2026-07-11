import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '../Context/tipos';

interface AuthContextData {
  usuario: Usuario | null;
  login: (datos: Usuario) => Promise<void>;
  logout: () => Promise<void>;
  cargando: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Cargar sesión guardada al iniciar la app
    const cargarSesion = async () => {
      const sesionGuardada = await AsyncStorage.getItem('@SEGAP:usuario');
      if (sesionGuardada) {
        setUsuario(JSON.parse(sesionGuardada));
      }
      setCargando(false);
    };
    cargarSesion();
  }, []);

  const login = async (datos: Usuario) => {
    setUsuario(datos);
    await AsyncStorage.setItem('@SEGAP:usuario', JSON.stringify(datos));
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@SEGAP:usuario');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar la sesión fácilmente
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}