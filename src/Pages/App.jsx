import { useEffect, useState } from "react";
import { UserForm } from "../Components/UserForm";
import { UserList } from "../Components/UserList";

export default function App() {
  const baseUrl = "http://localhost:8888/PengenSukses/src/API/index.php";

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: "", nama: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  // === GET Users ===
  async function fetchUsers() {
    try {
      const res = await fetch(baseUrl);
      const json = await res.json();

      if (json.status) {
        setUsers(json.data);
      } else {
        setUsers([]);
      }
      console.log(users);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  }

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch(baseUrl);
        const json = await res.json();

        if (json.status) {
          setUsers(json.data);
        } else {
          setUsers([]);
        }
        console.log(users);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    getTasks();
  }, []);

  // === Form input handler ===
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // === POST: Tambah user ===
  async function addUser(e) {
    e.preventDefault();

    await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: form.nama,
        email: form.email,
        pencapaian: 0,
      }),
      
    });
    console.log(form.id),
    setForm({ id: "", nama: "", email: "" });
    fetchUsers();
  }

  // === PUT: Edit user ===
  async function editUser(e) {
    e.preventDefault();

    await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: form.id,
        nama: form.nama,
        email: form.email,
      }),
    });

    setIsEditing(false);
    setForm({ id: "", nama: "", email: "" });
    fetchUsers();
  }

  // === PUT: Update pencapaian user ===
  async function updatePencapaianUser(id, pencapaian, perubahan) {
    await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        pencapaian: Number(pencapaian) + Number(perubahan),
      }),
    });
    fetchUsers();
  }

  // === DELETE: Hapus user ===
  async function deleteUser(id) {
    await fetch(baseUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchUsers();
  }

  // === Saat klik tombol edit ===
  function startEdit(user) {
    setIsEditing(true);
    setForm({
      id: user.id,
      nama: user.nama,
      email: user.email,
    });
  }

  return (
    <div className="flex mx-auto items-center justify-center gap-5 items-start">
      {/* Anggota Kelompok */}
      <div className="w-auto my-10 p-8 bg-sky-500/50 rounded-xl shadow-lg">
        <h1 className="text-white text-center text-2xl mb-3 underline">Anggota Kelompok</h1>
        <div className="p-5 bg-white rounded-xl shadow-lg">
          <div className="space-y-2 text-gray-700 ">
            <p>Aji Putra Pamungkas (50423097)</p>
            <p>Maulana Badhawi (50423753)</p>
            <p>Muhammad Verdiansyah (51423029)</p>
          </div>
        </div>
      </div>

      {/* Utama */}
      <div className="p-8 max-w-7xl my-10 bg-sky-500/50 bg-opacity-80 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-white">Aplikasi Untuk Orang Sukses</h1>

        {/* Form */}
        <UserForm
          form={form}
          onChange={handleChange}
          onSubmit={isEditing ? editUser : addUser}
          isEditing={isEditing}
          onCancel={() => {
            setIsEditing(false);
            setForm({ id: "", nama: "", email: "" });
          }}
        />

        
        {/* Tabel */}
        <h1 className="text-4xl font-bold mb-6 text-white">Manajemen Orang Sukses</h1>
        <UserList
          users={users}
          onUpdatePencapaian={updatePencapaianUser}
          onEdit={startEdit}
          onDelete={deleteUser}
        />
      </div>

      <div className="w-auto text-center my-10 p-8 bg-sky-500/50 rounded-xl shadow-lg">
        <h2 className="text-white text-center text-2xl mb-3 underline">Catatan</h2>
        <div className="p-5 bg-white rounded-xl shadow-lg">
          <p><span className="font-semibold">Belajar</span>: Pencapaian + 10</p>
          <p><span className="font-semibold">Malas</span>: Pencapaian - 10</p>
        </div>
      </div>
    </div>
  );
}