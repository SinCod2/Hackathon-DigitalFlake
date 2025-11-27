import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { userAPI, roleAPI } from "../utils/api";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getAll();
      setUsers(response.data.data);
    } catch (error) {
      toast.error("Error fetching users");
    }
    setLoading(false);
  };

  const fetchRoles = async () => {
    try {
      const response = await roleAPI.getAll();
      setRoles(response.data.data);
    } catch (error) {
      toast.error("Error fetching roles");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role?._id || "",
      status: user.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userAPI.delete(id);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        toast.error("Error deleting user");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userAPI.update(editingUser._id, formData);
      toast.success("User updated successfully");
      setShowModal(false);
      fetchUsers();
      resetForm();
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
      status: "Active",
    });
    setEditingUser(null);
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "role.name",
      header: "Role",
      cell: (info) => info.getValue() || "No Role",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            info.getValue() === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(info.row.original)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => handleDelete(info.row.original._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search users..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <span className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit User</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">No Role</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 rounded-md font-semibold hover:bg-secondary transition"
                >
                  Update User
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
