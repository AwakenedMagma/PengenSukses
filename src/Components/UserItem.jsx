export function UserItem({ user, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50 transition-all duration-200">
      <td className="px-5 py-3 text-gray-700 font-medium">{user.id}</td>
      <td className="px-5 py-3 text-gray-700">{user.nama}</td>
      <td className="px-5 py-3">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
          {user.email}
        </span>
      </td>
      <td className="px-5 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(user)}
            className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-sm font-medium shadow-sm transition-all"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium shadow-sm transition-all"
          >
            Hapus
          </button>
        </div>
      </td>
    </tr>
  );
}
