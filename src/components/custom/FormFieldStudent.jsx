import React from "react";
import { FormInput } from "./FormInput";
import FormSelection from "./FormSelection";

const FormFieldStudent = ({
    isEnable,
    valueStudent,
    isDisable,
    setValueStudent,
}) => {
    const formatToApiDate = (value) => {
        const parts = value.split("/");
        if (parts.length !== 3) return value;
        const [day, month, year] = parts;
        if (day.length === 2 && month.length === 2 && year.length === 4) {
            return `${day}-${month}-${year}`;
        }
        return value;
    };

    const departmentOption = {
        "Mathematics": 1,
        "Science": 2,
        "Languages": 3,
        "Social Studies": 4,
        "Information Technology": 5,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValueTeacher((prev) => ({
            ...prev,
            [name]: name === "dateOfBirth" ? formatToApiDate(value) : value,
            [name]: name === "enrolledDate" ? formatToApiDate(value) : value,
        }));
    };
    return (
        <div className="overflow-scroll pb-2">
            <div className="grid grid-cols-2 gap-x-4">
                <FormInput
                    label={"First NameEn"}
                    disable={isEnable}
                    type={Text}
                    nameId={"firstNameEn"}
                    value={valueStudent?.firstNameEn || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"First NameKh"}
                    disable={isEnable}
                    type={Text}
                    nameId={"firstNameKh"}
                    value={valueStudent?.firstNameKh || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Last NameEn"}
                    disable={isEnable}
                    type={Text}
                    nameId={"lastNameEn"}
                    value={valueStudent?.lastNameEn || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Last NameKh"}
                    disable={isEnable}
                    type={Text}
                    nameId={"lastNameKh"}
                    value={valueStudent?.lastNameKh || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Email"}
                    disable={isEnable}
                    type={Text}
                    nameId={"email"}
                    value={valueStudent?.email || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Phone Number"}
                    disable={isEnable}
                    type={Text}
                    nameId={"phoneNumber"}
                    value={valueStudent?.phoneNumber || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Date of birth"}
                    disable={isEnable}
                    type={Text}
                    nameId={"dateOfBirth"}
                    value={valueStudent?.dateOfBirth || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Place of birth"}
                    disable={isEnable}
                    type={Text}
                    nameId={"placeOfBirth"}
                    value={valueStudent?.placeOfBirth || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Current Address"}
                    disable={isEnable}
                    type={Text}
                    nameId={"currentAddress"}
                    value={valueStudent?.currentAddress || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Current Address"}
                    disable={isEnable}
                    type={Text}
                    nameId={"currentAddress"}
                    value={valueStudent?.currentAddress || ""}
                    onChange={handleChange}
                />
                <FormSelection
                    label={"Grade Level"}
                    selectValue={valueStudent?.gradeLevel || ""}
                    nameId={"gradeLevel"}
                    options={[
                        { text: "--select gender--" },
                        { text: "Male", value: "MALE" },
                        { text: "Female", value: "FEMALE" },
                    ]}
                    onChange={handleChange}
                />
                <FormSelection
                    label={"Homeroom Class"}
                    selectValue={valueStudent?.homeroomClassId || ""}
                    nameId={"homeroomClassId"}
                    options={[
                        { text: "--select gender--" },
                        { text: "Male", value: "MALE" },
                        { text: "Female", value: "FEMALE" },
                    ]}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Enrolled Date"}
                    disable={isEnable}
                    type={Text}
                    nameId={"enrolledDate"}
                    value={valueStudent?.enrolledDate || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"GPA"}
                    disable={isEnable}
                    type={Number}
                    nameId={"gpa"}
                    value={valueStudent?.gpa || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Emergency Contact Name"}
                    disable={isEnable}
                    type={Text}
                    nameId={"emergencyContactName"}
                    value={valueStudent?.emergencyContactName || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Emergency Contact Phone"}
                    disable={isEnable}
                    type={Text}
                    nameId={"emergencyContactPhone"}
                    value={valueStudent?.emergencyContactPhone || ""}
                    onChange={handleChange}
                />
                <FormSelection
                    label={"Gender"}
                    selectValue={valueStudent?.gender || ""}
                    nameId={"gender"}
                    options={[
                        { text: "--select gender--" },
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
                    value={valueStudent?.nationalId || ""}
                    onChange={handleChange}
                />
                <FormSelection
                    label={"status"}
                    selectValue={valueStudent?.status || ""}
                    nameId={"status"}
                    options={[
                        { text: "--status--" },
                        { text: "Active", value: "ACTIVE" },
                        { text: "Inactive", value: "INACTIVE" },
                    ]}
                    onChange={handleChange}
                />
                <FormSelection
                    label="Department"
                    selectValue={valueStudent?.departmentId ?? ""}
                    nameId="departmentId"
                    options={[
                        { text: "--Select Department--", value: "" },
                        ...Object.entries(departmentOption).map(
                            ([text, value]) => ({ text, value }),
                        ),
                    ]}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default FormFieldStudent;
