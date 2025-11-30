import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  const displayName = user?.name || user?.phone || "User";
  const displayEmail = user?.email || "Not Provided";
  const displayPhone = user?.phone || "Not Provided";
  const displayPicture =
    user?.picture || "https://ui-avatars.com/api/?name=" + displayName;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md border border-gray-200">
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={displayPicture}
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover border shadow-sm"
            onError={(e) => {
              e.currentTarget.src =
                "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" +
                displayName;
            }}
          />
          <h1 className="text-xl font-semibold text-blue-900 mt-3 leading-tight">
            {displayName}
          </h1>
          <p className="text-gray-500 text-xs">Account Overview</p>
        </div>

        <div className="space-y-4 text-sm">
          <div className="p-3 border rounded-lg bg-gray-50">
            <h2 className="text-xs font-medium text-gray-500 mb-0.5">Email</h2>
            <p className="text-blue-900 font-semibold truncate">
              {displayEmail}
            </p>
          </div>

          <div className="p-3 border rounded-lg bg-gray-50">
            <h2 className="text-xs font-medium text-gray-500 mb-0.5">Phone</h2>
            <p className="text-blue-900 font-semibold">{displayPhone}</p>
          </div>

          <div className="p-3 border rounded-lg bg-gray-50">
            <h2 className="text-xs font-medium text-gray-500 mb-0.5">Status</h2>
            <p className="text-green-600 font-semibold">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
