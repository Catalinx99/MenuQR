// import { useCallback, useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
// import { useAtomValue, useSetAtom } from "jotai";
// import { savedMenusAtom } from "../atoms/savedMenuts";
import { ViewMenu } from "../pages/ViewMenu"; // sau de unde o imporți
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase/firebaseConfig.ts";
// import { getMenusForCurrentUser } from "../firebase/getMenusForCurrentUser.ts";
import { getMenuById } from "../firebase/getMenuById.ts";
import LightThemeViewMenu from "./ViewMenuModern.tsx";
import ViewMenuDark from "./ViewMenuDark.tsx";
import ViewMenuLight from "./ViewMenuLightTheme.tsx";
import FineDiningMenu from "./ViewMenuFineDining.tsx";

// export const TemplatePreviewPage = () => {
//   const [searchParams] = useSearchParams();
//   const menuId = searchParams.get("menuId");
//   const savedMenus = useAtomValue(savedMenusAtom);
//   const navigate = useNavigate();

//   const [currentMenu, setCurrentMenu] = useState(null);
//   console.log(menuId, "me222nu");
//   useEffect(() => {
//     if (menuId) {
//       const menu = savedMenus.find((m) => m.id === menuId);
//       if (menu) {
//         setCurrentMenu(menu);
//       } else {
//         navigate("/not-found");
//       }
//     } else {
//       // Adaugă tratarea cazului când lipsește menuId
//       navigate("/not-found");
//     }
//   }, [menuId, savedMenus, navigate]);

//   if (!currentMenu) return <div>Loading menu...</div>;

//   return (
//     <Test>
//       <ViewMenu currentMenu={currentMenu} />
//     </Test>
//   );
// };
export const TemplatePreviewPage = () => {
  const [searchParams] = useSearchParams();
  const menuId = searchParams.get("menuId");
  const [currentMenu, setCurrentMenu] = useState(null);
  const navigate = useNavigate();
  console.log(menuId, currentMenu?.templateType, "menuId");

  useEffect(() => {
    const loadMenu = async () => {
      // if (!menuId) {
      //   navigate("/not-found");
      //   return;
      // }

      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const fetchedMenu = await getMenuById(menuId);
        console.log(fetchedMenu, "fetchedMenu");

        // if (!fetchedMenu) {
        //   navigate("/not-found");
        //   return;
        // }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setCurrentMenu(fetchedMenu);
      } catch (error) {
        console.error("Eroare la încărcarea meniului:", error);
        navigate("/not-found");
      }
    };

    loadMenu();
  }, [menuId, navigate]);

  if (!currentMenu) {
    return <div className="loading">Loading...</div>;
  }

  switch (currentMenu.templateType) {
    case "Standard":
      // return <ViewMenu currentMenu={currentMenu} />;
      return <FineDiningMenu currentMenu={currentMenu} />;

    case "Basic":
      return <ViewMenuLight currentMenu={currentMenu} />;
    case "Advanced":
      return <ViewMenuDark currentMenu={currentMenu} />;
    default:
      return <LightThemeViewMenu currentMenu={currentMenu} />;
  }

  // return <ViewMenu currentMenu={currentMenu} />;
  // return <LightThemeViewMenu currentMenu={currentMenu} />;
  // return <ViewMenuDark currentMenu={currentMenu} />;
  // return <ViewMenuLight currentMenu={currentMenu} />;
};
