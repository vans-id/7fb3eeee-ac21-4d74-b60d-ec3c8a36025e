"use client";

import fetchEmployees from "@/lib/fetchEmployees";
import { Employee, EmployeesResults } from "@/models/Employees";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>();
  const [isLoading, setIsLoading] = useState<Boolean>();

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    const res: EmployeesResults | undefined = await fetchEmployees(
      "http://localhost:8080/employees"
    );
    if (!res) return;
    setEmployees(res.data.items);
  };

  const handleAddEmployee = () => {
    setEmployees((prev) => {
      const newEmptyRow = {
        _id: "",
        firstName: "",
        lastName: "",
        position: "",
        phone: "",
        email: "",
      };
      return [newEmptyRow, ...(prev as Employee[])];
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8080/employees", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employees),
      });
      if (!res.ok) throw new Error("Cannot load employees");

      const results = await res.json();
      if (!results.hasOwnProperty("data")) {
        throw new Error("failed to fetch data");
      }

      Swal.fire({
        title: "Success!",
        text: "Data has been saved",
        icon: "success",
      });
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Something went wrong...",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>

      <div className="mx-6 my-3">
        <div className="flex flex-end mb-6">
          <button
            style={{ width: "100px" }}
            className="btn btn-primary mr-3"
            onClick={handleAddEmployee}
          >
            Add
          </button>
          <button
            style={{ width: "100px" }}
            className="btn btn-secondary mr-3"
            onClick={handleSave}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <span>Save</span>
            )}
          </button>

          <button
            style={{ width: "100px" }}
            className="btn btn-accent mr-3"
            onClick={getAllEmployees}
          >
            Refresh
          </button>
        </div>
        {employees ? (
          <div className="card card-compact bg-base-100 shadow-xl">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-lg">First Name</th>
                    <th className="text-lg">Last Name</th>
                    <th className="text-lg">Position</th>
                    <th className="text-lg">Phone</th>
                    <th className="text-lg">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {employees!!.map((employee: Employee, i: number) => (
                    <tr
                      key={employee._id || i}
                      className="bg-white border-b border-gray-200"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          className="input input-sm input-bordered w-full max-w-xs"
                          value={employee.firstName}
                          onChange={(e) => {
                            const updated = [...employees!];
                            updated[
                              updated.findIndex((u) => u._id === employee._id)
                            ].firstName = e.target.value;
                            setEmployees(updated);
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          className="input input-sm input-bordered w-full max-w-xs"
                          value={employee.lastName}
                          onChange={(e) => {
                            const updated = [...employees!];
                            updated[
                              updated.findIndex((u) => u._id === employee._id)
                            ].lastName = e.target.value;
                            setEmployees(updated);
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          className="input input-sm input-bordered w-full max-w-xs"
                          value={employee.position}
                          onChange={(e) => {
                            const updated = [...employees!];
                            updated[
                              updated.findIndex((u) => u._id === employee._id)
                            ].position = e.target.value;
                            setEmployees(updated);
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          className="input input-sm input-bordered w-full max-w-xs"
                          value={employee.phone}
                          onChange={(e) => {
                            const updated = [...employees!];
                            updated[
                              updated.findIndex((u) => u._id === employee._id)
                            ].phone = e.target.value;
                            setEmployees(updated);
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          className="input input-sm input-bordered w-full max-w-xs"
                          value={employee.email}
                          onChange={(e) => {
                            const updated = [...employees!];
                            updated[
                              updated.findIndex((u) => u._id === employee._id)
                            ].email = e.target.value;
                            setEmployees(updated);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h2 className="m-4 text-2xl font-bold">No employees Found</h2>
        )}
      </div>
    </>
  );
}
