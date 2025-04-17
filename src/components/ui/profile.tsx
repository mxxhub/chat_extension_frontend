export const Profile = (props: any) => {
  return (
    <div className="absolute right-0 mt-2 w-36 bg-[#101114] rounded-lg shadow-lg z-50">
      <button
        onClick={props.myProfile}
        className="block w-full px-4 py-2 text-sm text-white hover:bg-[#1e2025] text-left hover:rounded-lg"
      >
        Profile
      </button>
      <button
        onClick={props.logout}
        className="block w-full px-4 py-2 text-sm text-white hover:bg-[#1e2025] hover:rounded-lg text-left"
      >
        Logout
      </button>
    </div>
  );
};
