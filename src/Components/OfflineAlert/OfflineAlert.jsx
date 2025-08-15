import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

export default function OfflineAlert({ children }) {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return (
      <>
        {children}

        <div
          className={`bg-red-200 w-3/4 sm:w-80 md:w-80 text-xs sm:text-sm md:text-[16px] text-red-600 px-3 py-2 rounded-md flex justify-center items-center gap-2 fixed bottom-3 right-1/2 translate-x-1/2 z-10 animate-slide-up`}
        >
          <FontAwesomeIcon icon={faWifi} />
          <p className="">check your internet connection</p>
        </div>
      </>
    );
  }

  return children;
}
