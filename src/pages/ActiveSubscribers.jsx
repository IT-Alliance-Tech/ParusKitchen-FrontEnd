import React, { useEffect, useState } from "react";
import {
  getAllUserSubscriptions,
  getUserSubscriptionById,
  updateUserSubscription,
  deleteUserSubscription,
} from "../api";
import { Edit, Eye, Trash2, X } from "lucide-react";

const ActiveSubscribers = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [editData, setEditData] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const token = localStorage.getItem("token");

  // ✅ Fetch all subscriptions
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await getAllUserSubscriptions(token);
      setSubscriptions(data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // ✅ Handle view
  const handleView = async (id) => {
    const data = await getUserSubscriptionById(id, token);
    setSelected(data);
    setViewModal(true);
  };

  // ✅ Handle edit open
  const handleEdit = (sub) => {
    setSelected(sub);
    setEditData({
      status: sub.status,
      price: sub.price || "",
    });
    setEditModal(true);
  };

  // ✅ Handle edit save
  const handleSaveEdit = async () => {
    try {
      await updateUserSubscription(selected._id, editData, token);
      setEditModal(false);
      fetchSubscriptions();
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  // ✅ Handle delete
  const handleDelete = async () => {
    try {
      await deleteUserSubscription(selected._id, token);
      setDeleteModal(false);
      fetchSubscriptions();
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary-800 text-center">
        Active Subscribers
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-100 text-left">
                <th className="p-3 border">User</th>
                <th className="p-3 border">Plan</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Start Date</th>
                <th className="p-3 border">End Date</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub._id} className="hover:bg-gray-100">
                  <td className="p-3 border">{sub.user?.name}</td>
                  <td className="p-3 border">{sub.plan?.name}</td>
                  <td
                    className={`p-3 border font-semibold ${
                      sub.status === "active"
                        ? "text-green-600"
                        : sub.status === "paused"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {sub.status}
                  </td>
                  <td className="p-3 border">
                    {new Date(sub.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 border">
                    {new Date(sub.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 border text-center space-x-3">
                    <button
                      onClick={() => handleView(sub._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(sub)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelected(sub);
                        setDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* View Modal */}
      {viewModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Subscription Details</h2>
              <X
                className="cursor-pointer"
                onClick={() => setViewModal(false)}
              />
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>User:</strong> {selected.user?.name} (
                {selected.user?.email})
              </p>
              <p>
                <strong>Plan:</strong> {selected.plan?.name}
              </p>
              <p>
                <strong>Status:</strong> {selected.status}
              </p>
              <p>
                <strong>Price:</strong> ₹{selected.price}
              </p>
              <p>
                <strong>Start:</strong>{" "}
                {new Date(selected.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {new Date(selected.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Remaining Days:</strong> {selected.remainingDays}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Subscription</h2>
              <X
                className="cursor-pointer"
                onClick={() => setEditModal(false)}
              />
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label className="font-semibold">Status:</label>
                <select
                  value={editData.status}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              <div>
                <label className="font-semibold">Price (₹):</label>
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                  className="w-full p-2 border rounded mt-1"
                />
              </div>
              <button
                onClick={handleSaveEdit}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete subscription for{" "}
              <strong>{selected.user?.name}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveSubscribers;
