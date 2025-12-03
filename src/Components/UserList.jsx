import { UserItem } from "./UserItem";

export function UserList({ users, onUpdatePencapaian, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <tr>
            <th className="px-5 py-3 text-sm font-semibold uppercase">ID</th>
            <th className="px-5 py-3 text-sm font-semibold uppercase">Nama</th>
            <th className="px-5 py-3 text-sm font-semibold uppercase">Email</th>
            <th className="px-5 py-3 text-sm font-semibold uppercase">Pencapaian</th>
            <th className="px-5 py-3 text-sm font-semibold uppercase">Aktivitas</th>
            <th className="px-5 py-3 text-sm font-semibold uppercase">Aksi</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-5 py-6 text-center text-gray-500 italic"
              >
                Tidak ada data
              </td>
            </tr>
          )}

          {users.map((u) => (
            <UserItem
              key={u.id}
              user={u}
              onUpdatePencapaian={onUpdatePencapaian}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
