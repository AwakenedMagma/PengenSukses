export function UserForm({ form, onChange, onSubmit, isEditing, onCancel }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 bg-white shadow-xl rounded-xl p-6 border border-gray-200 space-y-4"
    >
      <div>
        <label className="block text-sm font-semibold mb-1">Nama</label>
        <input
          name="nama"
          value={form.nama}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Masukkan nama"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="email@contoh.com"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md"
        >
          {isEditing ? "Update" : "Tambah"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 shadow-md"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
