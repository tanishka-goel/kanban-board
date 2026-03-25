import React, { useEffect, useState } from "react";
import FormInput from "@/components/shared/FormInput";
import NewButton from "../NewButton";
import { toast } from "sonner";
import { userSchema } from "@/validation/schemas/userSchema";

const AddUserFormModal = ({ onUserAddition, closeModal, selectedUser }) => {
  const [formdata, setFormdata] = useState({
    role: "",
    email: "",
    password: "",
    username: "",
    first_name: "",
    last_name: "",
  });
const [errors, setErrors] = useState({});
  const isEditMode = !!selectedUser;

  useEffect(() => {
    if (selectedUser) {
      const userData = selectedUser.data ?? selectedUser;
      setFormdata({
        role: userData.role || "",
        email: userData.email || "",
        password: userData.password || "",
        username: userData.username || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
      });
    }
  }, [selectedUser]);

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToValidate =
      isEditMode && !formdata.password.trim()
        ? { ...formdata, password: undefined }
        : formdata;

    const schema = isEditMode
      ? userSchema.partial({ password: true })
      : userSchema;

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const firstErrors = Object.fromEntries(
        Object.entries(fieldErrors).map(([key, msgs]) => [key, msgs?.[0] ?? ""])
      );
      setErrors(firstErrors);
      toast.error("Please fill all the fields correctly");
      return;
    }

    setErrors({});
    onUserAddition({
      ...result.data,
      role: result.data.role.trim().toLowerCase(),
    });
  };


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            {isEditMode ? "Edit User" : "Add User"}
          </h1>
          <NewButton
            className="bg-red-600 hover:bg-red-700 text-white h-8 w-8 flex items-center justify-center rounded-md"
            text={"X"}
            onClick={closeModal}
          />
        </div>

        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              labelTitle={"First Name"}
              placeholder={"Enter first name"}
              name="first_name"
              required
              inputValue={formdata.first_name}
              onChange={handleChange}
              error={errors.first_name} 
            />
            <FormInput
              labelTitle={"Last Name"}
              placeholder={"Enter last name"}
              name="last_name"
              required
              inputValue={formdata.last_name}
              onChange={handleChange}
              error={errors.last_name}
            />
          </div>

          <FormInput
            labelTitle={"Email"}
            placeholder={"Enter email"}
            name="email"
            required
            type="email"
            inputValue={formdata.email}
            onChange={handleChange}
            error={errors.email}
          />

          <FormInput
            labelTitle={"Username"}
            placeholder={"Enter username"}
            name="username"
            required
            inputValue={formdata.username}
            onChange={handleChange}
            error={errors.username}
          />

          <FormInput
            labelTitle={"Password"}
            placeholder={"Enter password"}
            name="password"
            required={!isEditMode}
            type="password"
            inputValue={formdata.password}
            onChange={handleChange}
            error={errors.password}
          />

          <FormInput
            labelTitle={"User Role"}
            placeholder={"Enter role (e.g. user/admin)"}
            name="role"
            required
            inputValue={formdata.role}
            onChange={handleChange}
            error={errors.role}
          />

          <div className="pt-4 flex justify-end">
            <NewButton
              type="submit"
              text={isEditMode ? "Update User" : "Add User"}
              className="bg-secondary hover:bg-emerald-800 text-white px-5 py-2 rounded-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserFormModal;
