import React from "react";

const CreateUser = () => {
    return (
        <div className="w-full h-full px-80">
            <h1 className="text-xl font-bold"> Create User</h1>
            <p className="text-gray-400 mb-2">Create a new user account</p>
            <div className="flex justify-center">
                <div className="w-150">
                    <form
                        action="POST"
                        className="grid grid-cols-2 w-full gap-x-4"
                    >
                        <label htmlFor="firstName" >First Name </label>
                        <label htmlFor="lastName">Last Name </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300  dark:border-gray-600"
                        />
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="border-2 border-gray-300  dark:border-gray-600 rounded-md p-1.5 outline-none mb-2"
                        />
                        <label htmlFor="email" className="col-span-2">
                            Email{" "}
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="col-span-2 border-2 border-gray-300  dark:border-gray-600 rounded-md p-1.5 outline-none mb-2"
                        />
                        <label htmlFor="phoneNumber" className="col-span-2">
                            Phone Number
                        </label>
                        <input
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                    /\D/g,
                                    "",
                                );
                            }}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            className="col-span-2 border-2 border-gray-300  dark:border-gray-600 rounded-md p-1.5 outline-none mb-2"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
