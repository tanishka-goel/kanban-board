import React, { useEffect, useState } from "react";
import FormInput from "@/components/shared/FormInput";
import NewButton from "./shared/NewButton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const AddUserFormModal = ({ onUserAddition, closeModal, selectedUser }) => {
  const [formdata, setFormdata] = useState({
    role: "",
    email: "",
    password: "",
    username: "",
    first_name: "",
    last_name: "",
  });

  const isEditMode = !!selectedUser;

  useEffect(() => {
    if (selectedUser) {
      setFormdata({
        role: selectedUser.role||"",
        email: selectedUser.email||"",
        password: selectedUser.password||"",
        username: selectedUser.username||"",
        first_name: selectedUser.first_name||"",
        last_name: selectedUser.last_name||"",
      });
    }
  }, [selectedUser]);

   const handleChange = (e) => {
    setFormdata((prev) => ({
  ...prev,
  [e.target.name]: e.target.value,
}));
  };

  const handleSubmit = (e) =>{
    e.preventDefault()
     onUserAddition(formdata);
  }

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              labelTitle={"First Name"}
              placeholder={"Enter first name"}
              name="first_name"
              required
              inputValue={formdata.first_name}
              onChange={handleChange}
            />

            <FormInput
              labelTitle={"Last Name"}
              placeholder={"Enter last name"}
              name="last_name"
              required
               inputValue={formdata.last_name}
              onChange={handleChange}
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
          />

          <FormInput
            labelTitle={"Username"}
            placeholder={"Enter username"}
            name="username"
            required
             inputValue={formdata.username}
              onChange={handleChange}
          />

          <FormInput
            labelTitle={"Password"}
            placeholder={"Enter password"}
            name="password"
            required
            type="password"
             inputValue={formdata.password}
              onChange={handleChange}
          />

          <div className="space-y-2 pt-2">
            <Label className="text-sm font-medium text-gray-700">
              User Role
            </Label>

            <RadioGroup
  value={formdata.role}
  onValueChange={(value) =>
    setFormdata((prev) => ({
      ...prev,
      role: value,
    }))
  }
  className="flex gap-6 pt-1"
>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">User</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admin</Label>
              </div>
            </RadioGroup>
          </div>

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
