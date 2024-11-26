// // src/context/LocaleContext.tsx
// "use client";
// import React, { createContext, useContext, useState, useEffect } from "react";

// interface LocaleContextType {
//   locale: string;
//   setLocale: (locale: string) => void;
// }

// const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [locale, setLocale] = useState("en"); // Default locale

//   useEffect(() => {
//     const cookieLocale = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("locale="));
//     if (cookieLocale) {
//       setLocale(cookieLocale.split("=")[1]);
//     }
//   }, []);

//   return (
//     <LocaleContext.Provider value={{ locale, setLocale }}>
//       {children}
//     </LocaleContext.Provider>
//   );
// };

// export const useLocale = () => {
//   const context = useContext(LocaleContext);
//   if (!context) {
//     throw new Error("useLocale must be used within a LocaleProvider");
//   }
//   return context;
// };
