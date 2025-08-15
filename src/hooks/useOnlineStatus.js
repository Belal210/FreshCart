import { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function handleIsOnline() {
      setIsOnline(true);
    }
    function handleIsOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleIsOnline);
    window.addEventListener("offline", handleIsOffline);

    return function () {
      window.removeEventListener("online", handleIsOnline);
      window.removeEventListener("offline", handleIsOffline);
    };
  }, []);

  return isOnline;
}
