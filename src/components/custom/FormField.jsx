import React from "react";
import { FormInput } from "./FormInput";
import FormSelection from "./FormSelection";
import { LogIn } from "lucide-react";

const FormField = ({ isEnable, valueTeacher, isDisable, setValueTeacher }) => {
    const formatToApiDate = (value) => {
        const parts = value.split("/");
        if (parts.length !== 3) return value;
        const [day, month, year] = parts;
        if (day.length === 2 && month.length === 2 && year.length === 4) {
            return `${year}-${month}-${day}`;
        }
        return value;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValueTeacher((prev) => ({
            ...prev,
            [name]: name === "dateOfBirth" ? formatToApiDate(value) : value,
        }));
    };
    return (
        <div className="overflow-scroll pb-2">
            <div className="grid grid-cols-2 gap-x-4">
                <FormInput
                    label={"First NameEn"}
                    disable={isEnable}
                    type={Text}
                    nameId={"fullNameEn"}
                    value={valueTeacher?.firstNameEn || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"First NameKh"}
                    disable={isEnable}
                    type={Text}
                    nameId={"firstnamekh"}
                    value={valueTeacher?.firstNameKh || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Last NameEn"}
                    disable={isEnable}
                    type={Text}
                    nameId={"lastnameen"}
                    value={valueTeacher?.lastNameEn || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Last NameKh"}
                    disable={isEnable}
                    type={Text}
                    nameId={"lastnamekh"}
                    value={valueTeacher?.lastNameKh || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Email"}
                    disable={isEnable}
                    type={Text}
                    nameId={"email"}
                    value={valueTeacher?.email || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Phone Number"}
                    disable={isEnable}
                    type={Text}
                    nameId={"phoneNumber"}
                    value={valueTeacher?.phoneNumber || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Date of birth"}
                    disable={isEnable}
                    type={Text}
                    nameId={"dateOfBirth"}
                    value={valueTeacher?.dateOfBirth || ""}
                    onChange={handleChange}
                />
                <FormSelection
                    label={"Sex"}
                    selectValue={valueTeacher?.sex || ""}
                    nameId={"sex"}
                    options={[
                        { text: "select sex:" },
                        { text: "Male", value: "MALE" },
                        { text: "Female", value: "FEMALE" },
                    ]}
                    onChange={handleChange}
                />
                <FormInput
                    label={"NationalId"}
                    disable={isEnable}
                    type={Text}
                    nameId={"nationalId"}
                    value={valueTeacher?.nationalId || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Specialization"}
                    disable={isEnable}
                    type={Text}
                    nameId={"specialization"}
                    value={valueTeacher?.specialization || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Qualification"}
                    disable={isEnable}
                    type={Text}
                    nameId={"qualification"}
                    value={valueTeacher?.qualification || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"HiredDate"}
                    disable={isEnable}
                    type={Text}
                    nameId={"hiredDate"}
                    value={valueTeacher?.hiredDate || ""}
                    onChange={handleChange}
                />
                <FormSelection
                    label={"EmploymentStatus"}
                    selectValue={valueTeacher?.employmentStatus || ""}
                    nameId={"employmentStatus"}
                    options={[
                        { text: "status:" },
                        { text: "Active", value: "ACTIVE" },
                        { text: "Inactive", value: "INACTIVE" },
                    ]}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Salary"}
                    disable={isEnable}
                    type={Number}
                    nameId={"salary"}
                    value={valueTeacher?.salary || ""}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default FormField;
