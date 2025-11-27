import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { productAPI, categoryAPI, subcategoryAPI } from "../utils/api";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiImage } from "react-icons/fi";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    subcategory: "",
    image: "",
    status: "Active",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (formData.category) {
      const filtered = subcategories.filter(
        (sub) => sub.category?._id === formData.category
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.category, subcategories]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAll();
      setProducts(response.data.data || response.data);
    } catch (error) {
      toast.error("Error fetching products");
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data.data || response.data);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await subcategoryAPI.getAll();
      setSubcategories(response.data.data || response.data);
    } catch (error) {
      toast.error("Error fetching subcategories");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      category: product.category?._id || "",
      subcategory: product.subcategory?._id || "",
      image: product.image,
      status: product.status,
    });
    setImagePreview(product.image);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        setLoading(true);
        await productAPI.delete(productToDelete);
        toast.success("Product deleted successfully");
        await fetchProducts();
        setShowDeleteModal(false);
        setProductToDelete(null);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting product");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "Please upload a valid image file (JPEG, PNG, GIF, or WebP)"
        );
        e.target.value = "";
        return;
      }

      // Validate file size (10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File size must be less than 10MB");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.onerror = () => {
        toast.error("Error reading file");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingProduct) {
        await productAPI.update(editingProduct._id, formData);
        toast.success("Product updated successfully");
      } else {
        await productAPI.create(formData);
        toast.success("Product added successfully");
      }
      setShowModal(false);
      resetForm();
      setLoading(true);
      await fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      category: "",
      subcategory: "",
      image: "",
      status: "Active",
    });
    setImagePreview("");
    setEditingProduct(null);
    setFilteredSubcategories([]);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Id",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "productName",
      header: "Product name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "category.categoryName",
      header: "Category",
      cell: (info) => info.getValue() || "N/A",
    },
    {
      accessorKey: "subcategory.subcategoryName",
      header: "Subcategory",
      cell: (info) => info.getValue() || "N/A",
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: (info) =>
        info.getValue() ? (
          <img
            src={info.getValue()}
            alt="Product"
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
            <FiImage className="text-gray-400" />
          </div>
        ),
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
      header: "Action",
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
    data: products,
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
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition"
        >
          Add New
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-yellow-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
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
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="animate-spin h-10 w-10 text-primary mb-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <p className="text-gray-500 font-medium">
                        Loading products...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No products found
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto scrollbar-hide">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 my-8 transform transition-all max-h-[90vh] overflow-y-auto scrollbar-hide">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 sm:px-6 py-4 rounded-t-2xl sticky top-0 z-10">
              <div className="flex justify-between items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center flex-1 min-w-0">
                  {editingProduct ? (
                    <>
                      <FiEdit2 className="mr-2 flex-shrink-0" size={20} />
                      <span className="truncate">Edit Product</span>
                    </>
                  ) : (
                    <>
                      <FiPlus className="mr-2 flex-shrink-0" size={20} />
                      <span className="truncate">Add New Product</span>
                    </>
                  )}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200 flex-shrink-0"
                  aria-label="Close modal"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
              <div className="mb-5">
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                      subcategory: "",
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Subcategory <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.subcategory}
                  onChange={(e) =>
                    setFormData({ ...formData, subcategory: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white"
                  required
                  disabled={!formData.category}
                >
                  <option value="">Select Subcategory</option>
                  {filteredSubcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.subcategoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) =>
                    setFormData({ ...formData, productName: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  required
                  placeholder="Enter product name"
                />
              </div>

              <div className="mb-5">
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Upload Image
                </label>
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center bg-purple-50 hover:bg-purple-100 transition-all duration-200">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-40 h-40 object-cover mx-auto rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          setFormData({ ...formData, image: "" });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 transform hover:scale-110"
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className="w-20 h-20 mx-auto mb-3 bg-purple-200 rounded-full flex items-center justify-center">
                        <FiImage className="text-purple-600 text-4xl" />
                      </div>
                      <p className="text-gray-700 font-medium mb-1">
                        Choose an image to upload
                      </p>
                      <p className="text-gray-500 text-sm">
                        PNG, JPG, GIF or WebP (Max 10MB)
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleImageChange}
                    className="mt-3 w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer transition-all duration-200"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  disabled={submitting}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 sm:px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center flex-1 min-w-0">
                  <FiTrash2 className="mr-2 flex-shrink-0" size={20} />
                  <span className="truncate">Delete Product</span>
                </h2>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                  }}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200 flex-shrink-0"
                  aria-label="Close modal"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <FiTrash2 className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Are you sure you want to delete this product?
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone. This will permanently delete the
                  product from the database.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                  }}
                  disabled={loading}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
