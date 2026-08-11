import { useState, FormEvent } from "react";
import PasswordInput from "./PasswordInput";
import { createUser } from "../../api/users";
import { UserRole } from "../../types/user";

import {
  UserPlus,
  UserCircle2,
  Building2,
  CheckCircle2,
} from "lucide-react";


type FormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  department?: string;
  role?: string;
};


export default function CreateUserForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState<UserRole>("employee");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");


  const validateForm = () => {
  const newErrors: FormErrors = {};

  if (!fullName.trim()) {
    newErrors.fullName = "Full name is required.";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (!password.trim()) {
    newErrors.password = "Password is required.";
  } else if (password.length < 8) {
    newErrors.password =
      "Password must be at least 8 characters.";
  }

  if (!department) {
    newErrors.department =
      "Please select a department.";
  }

  if (!role) {
    newErrors.role =
      "Please select a role.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await createUser({
        full_name: fullName,
        email,
        password,
        department,
        role,
      });

      setSuccessMessage("User Created Successfully");

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      // Reset form
      setFullName("");
      setEmail("");
      setPassword("");
      setDepartment("");
      setRole("employee");
      setErrors({});

    } catch (error) {
      console.error("Create user failed:", error);

    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="
        relative
        rounded-3xl
        border
        border-white/10
        bg-[#173A5D]
        p-6
        shadow-[0_12px_40px_rgba(0,0,0,.22)]
      "
    >

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-blue-500/15 p-2.5">
          <UserPlus
            size={22}
            className="text-blue-400" 
          />
        </div>


        <div>
          <h2 className="text-xl font-semibold text-white">
            Create User
          </h2>

          <p className="mt-1 text-sm text-white/60">
            Create secure employee accounts.
          </p>
        </div>

      </div>


      <div className="mt-4 border-b border-white/10" />


      <form
        onSubmit={handleSubmit}
        className="mt-5 space-y-5"
      >

      {successMessage && (
  <div className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl bg-black/20">
    <div
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-green-500/30
        bg-[#173A5D]
        px-8
        py-5
        shadow-2xl
        animate-in
        fade-in
        zoom-in-95
      "
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
        <CheckCircle2
          size={28}
          className="text-green-400"
        />
      </div>

      <div>
        <p className="text-lg font-semibold text-white">
          User Created Successfully
        </p>
      </div>
    </div>
  </div>
)}

        {/* Account Information */}
        <div>

          <div className="flex items-center gap-2">

            <UserCircle2
              size={18}
              className="text-blue-400"
            />

            <h3 className="text-base font-semibold text-white">
              Account Information
            </h3>

          </div>

          <div className="mt-3 border-b border-white/10" />

        </div>



        {/* Full Name + Email */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


          <div>
            <label className="mb-2 block text-sm text-white/70">
              Full Name
            </label>

            <input
  type="text"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  placeholder="John Doe"
  className={`
    w-full
    rounded-xl
    border
    bg-[#123250]
    px-4
    py-2.5
    text-white
    placeholder:text-slate-400
    outline-none
    transition

    ${
      errors.fullName
        ? "border-red-500"
        : "border-[#2E5C86] focus:border-blue-400"
    }
  `}
/>
{errors.fullName && (
  <p className="mt-1 text-sm text-red-400">
    {errors.fullName}
  </p>
)}

          </div>



          <div>

            <label className="mb-2 block text-sm text-white/70">
              Email
            </label>
              <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="john@company.com"
  className={`
    w-full
    rounded-xl
    border
    bg-[#123250]
    px-4
    py-2.5
    text-white
    placeholder:text-slate-400
    outline-none
    transition

    ${
      errors.email
        ? "border-red-500 focus:border-red-500"
        : "border-[#2E5C86] focus:border-blue-400"
    }
  `}
/>

{errors.email && (
  <p className="mt-1 text-sm text-red-400">
    {errors.email}
  </p>
)}

          </div>


        </div>




        {/* Password */}

        <div>

          <label className="mb-2 block text-sm text-white/70">
            Password
          </label>


          <PasswordInput
            value={password}
            onChange={setPassword}
          />

          {errors.password && (
  <p className="mt-1 text-sm text-red-400">
    {errors.password}
  </p>
)}

        </div>





        {/* Organization */}

        <div>

          <div className="flex items-center gap-2">

            <Building2
              size={18}
              className="text-blue-400"
            />

            <h3 className="text-base font-semibold text-white">
              Organization
            </h3>

          </div>


          <div className="mt-3 border-b border-white/10" />

        </div>






        {/* Department + Role */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


          <div>

            <label className="mb-2 block text-sm text-white/70">
              Department
            </label>


            <select
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
  className={`
    w-full
    rounded-xl
    border
    bg-[#123250]
    px-4
    py-2.5
    text-white
    outline-none
    transition

    ${
      errors.department
        ? "border-red-500 focus:border-red-500"
        : "border-[#2E5C86] focus:border-blue-400"
    }
  `}

            >
              

              <option value="">
                Select Department
              </option>

              <option value="AI">
                IT
              </option>

              <option value="HR">
                HR
              </option>

              <option value="Finance">
                Finance
              </option>

              <option value="Marketing">
                Marketing
              </option>

              <option value="Operations">
                Operations
              </option>


            </select>

            {errors.department && (
  <p className="mt-1 text-sm text-red-400">
    {errors.department}
  </p>
)}

          </div>





          <div>

            <label className="mb-2 block text-sm text-white/70">
              Role
            </label>


            <select
  value={role}
  onChange={(e) =>
    setRole(e.target.value as UserRole)
  }
  className={`
    w-full
    rounded-xl
    border
    bg-[#123250]
    px-4
    py-2.5
    text-white
    outline-none
    transition

    ${
      errors.role
        ? "border-red-500 focus:border-red-500"
        : "border-[#2E5C86] focus:border-blue-400"
    }
  `}
>
            

              <option value="employee">
                Employee
              </option>

              <option value="admin">
                Administrator
              </option>


            </select>

            {errors.role && (
  <p className="mt-1 text-sm text-red-400">
    {errors.role}
  </p>
)}


          </div>


        </div>





        {/* Buttons */}

        <div className="flex justify-end gap-3 pt-2">


          <button
            type="button"
            className="
              rounded-xl
              border
              border-white/10
              px-5
              py-2.5
              text-sm
              text-white
              transition
              hover:bg-white/5
            "
          >
            Cancel
          </button>




          <button
            type="submit"
            disabled={loading}
            className="
              rounded-xl
              bg-blue-500
              px-6
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {loading ? "Creating..." : "Create User"}

          </button>


        </div>


      </form>


    </div>
  );
}