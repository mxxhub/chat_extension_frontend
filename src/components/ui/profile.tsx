import { useEffect, useRef } from "react";

const ProfileMenu = (props: any) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        console.log("clicked outside");
        props.setVisibility();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={popupRef}
      className="absolute right-0 mt-2 w-36 bg-[#101114] rounded-lg shadow-lg z-50"
    >
      {props.authenticated ? (
        <>
          <button
            onClick={props.myProfile}
            className="block w-full px-4 py-2 text-sm text-white hover:bg-[#1e2025] text-left hover:rounded-lg hover:border-transparent"
          >
            Profile
          </button>
          <button
            onClick={props.logout}
            className="block w-full px-4 py-2 text-sm text-white hover:bg-[#1e2025] hover:rounded-lg text-left hover:border-transparent"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={props.login}
          className="block w-full px-4 py-2 text-sm text-white hover:bg-[#1e2025] hover:rounded-lg hover:border-transparent text-left"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default ProfileMenu;
