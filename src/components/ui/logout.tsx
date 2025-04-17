export const Logout = (props: any) => {
  return (
    <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg z-50">
      <button
        onClick={props.myProfile}
        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
      >
        Profile
      </button>
      <button
        onClick={props.logout}
        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
      >
        Logout
      </button>
    </div>
  );
};
