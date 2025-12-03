import { useEffect, useState } from "react";
import { UserForm } from "/Applications/MAMP/htdocs/PengenSukses/src/Components/UserForm";
import { UserList } from "/Applications/MAMP/htdocs/PengenSukses/src/Components/UserList";



export default function ProductPage() {
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
      }),
      
    });
    console.log(form.id),
    setForm({ id: "", nama: "", email: "" });
    fetchUsers();
  }

  // === PUT: Update user ===
  async function updateUser(e) {
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
    <div className="p-8 max-w-3xl mx-auto"> 
      
      <h1 className="text-4xl font-bold mb-6 text-white">Manajemen Users</h1>
      
      {/* disini */}
      {/* Form */}
      <UserForm
        form={form}
        onChange={handleChange}
        onSubmit={isEditing ? updateUser : addUser}
        isEditing={isEditing}
        onCancel={() => {
          setIsEditing(false);
          setForm({ id: "", nama: "", email: "" });
        }}
      />

      {/* Tabel */}
      <UserList
        users={users}
        onEdit={startEdit}
        onDelete={deleteUser}
      />
    </div>
  );
}