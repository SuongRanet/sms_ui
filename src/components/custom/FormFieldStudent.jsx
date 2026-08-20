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
        Mathematics: 1,
        Science: 2,
        Languages: 3,
        "Social Studies": 4,
        "Information Technology": 5,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValueStudent((prev) => ({
            ...prev,
            [name]: name === "dateOfBirth" ? formatToApiDate(value) : value,
            [name]: name === "enrolledDate" ? formatToApiDate(value) : value,
        }));
    };
    const homeroomClassOption = {
        "Grade 7A": 1,
        "Grade 7B": 2,
        "Grade 8A": 3,
    };
    return (
        <div className="overflow-scroll pb-2">
            <div className="grid grid-cols-2 gap-x-4">
                <FormInput
                    label="First Name (En)"
                    disable={isEnable}
                    type="text"
                    nameId="firstNameEn"
                    value={valueStudent?.firstNameEn || ""}
                    onChange={handleChange}
                />

                <FormInput
                    label="Last Name (En)"
                    disable={isEnable}
                    type="text"
                    nameId="lastNameEn"
                    value={valueStudent?.lastNameEn || ""}
                    onChange={handleChange}
                />

                <FormInput
                    label="First Name (Kh)"
                    disable={isEnable}
                    type="text"
                    nameId="firstNameKh"
                    value={valueStudent?.firstNameKh || ""}
                    onChange={handleChange}
                />

                <FormInput
                    label="Last Name (Kh)"
                    disable={isEnable}
                    type="text"
                    nameId="lastNameKh"
                    value={valueStudent?.lastNameKh || ""}
                    onChange={handleChange}
                />

                <FormInput
                    label="Email"
                    disable={isEnable}
                    type="email"
                    nameId="email"
                    value={valueStudent?.email || ""}
                    onChange={handleChange}
                />

                <FormInput
                    label="Phone Number"
                    disable={isEnable}
                    type="text"
                    nameId="phoneNumber"
                    value={valueStudent?.phoneNumber || ""}
                    onChange={handleChange}
                />

                <FormInput
                    label="Date of Birth"
                    disable={isEnable}
                    type="date"
                    nameId="dateOfBirth"
                    value={valueStudent?.dateOfBirth || ""}
                    onChange={handleChange}
                />

                <FormInput
                    label="Place of Birth"
                    disable={isEnable}
                    type="text"
                    nameId="placeOfBirth"
                    value={valueStudent?.placeOfBirth || ""}
                    onChange={handleChange}
                />

                <FormInput
                    label="Current Address"
                    disable={isEnable}
                    type="text"
                    nameId="currentAddress"
                    value={valueStudent?.currentAddress || ""}
                    onChange={handleChange}
                />

                {/* Province */}
                <FormSelection
                    label="Province"
                    disable={isEnable}
                    nameId="province"
                    selectValue={valueStudent?.province || ""}
                    onChange={handleChange}
                    options={[
                        { text: "-- Select Province --", value: "" },
                        { text: "Phnom Penh", value: "PHNOM_PENH" },
                        { text: "Banteay Meanchey", value: "BANTEAY_MEANCHEY" },
                        { text: "Battambang", value: "BATTAMBANG" },
                        { text: "Kampong Cham", value: "KAMPONG_CHAM" },
                        { text: "Kampong Chhnang", value: "KAMPONG_CHHNANG" },
                        { text: "Kampong Speu", value: "KAMPONG_SPEU" },
                        { text: "Kampong Thom", value: "KAMPONG_THOM" },
                        { text: "Kampot", value: "KAMPOT" },
                        { text: "Kandal", value: "KANDAL" },
                        { text: "Koh Kong", value: "KOH_KONG" },
                        { text: "Kratie", value: "KRATIE" },
                        { text: "Mondulkiri", value: "MONDULKIRI" },
                        { text: "Preah Vihear", value: "PREAH_VIHEAR" },
                        { text: "Prey Veng", value: "PREY_VENG" },
                        { text: "Pursat", value: "PURSAT" },
                        { text: "Ratanakiri", value: "RATANAKIRI" },
                        { text: "Siem Reap", value: "SIEM_REAP" },
                        { text: "Preah Sihanouk", value: "PREAH_SIHANOUK" },
                        { text: "Stung Treng", value: "STUNG_TRENG" },
                        { text: "Svay Rieng", value: "SVAY_RIENG" },
                        { text: "Takeo", value: "TAKEO" },
                        { text: "Oddar Meanchey", value: "ODDAR_MEANCHEY" },
                        { text: "Kep", value: "KEP" },
                        { text: "Pailin", value: "PAILIN" },
                        { text: "Tboung Khmum", value: "TBOUNG_KHMUM" },
                    ]}
                />

                <FormInput
                    label="Grade Level"
                    disable={isEnable}
                    type="number"
                    nameId="gradeLevel"
                    value={valueStudent?.gradeLevel ?? ""}
                    onChange={handleChange}
                />

                {/* <FormInput
                    label="Homeroom Class ID"
                    disable={isEnable}
                    type="number"
                    nameId="homeroomClassId"
                    value={valueStudent?.homeroomClassId ?? ""}
                    onChange={handleChange}
                /> */}

                <FormInput
                    label="Enrolled Date"
                    disable={isEnable}
                    type="date"
                    nameId="enrolledDate"
                    value={valueStudent?.enrolledDate || ""}
                    onChange={handleChange}
                />

                <FormInput
                    label="End Date"
                    disable={isEnable}
                    type="date"
                    nameId="endDate"
                    value={valueStudent?.endDate || ""}
                    onChange={handleChange}
                />

                {/* <FormInput
                    label="GPA"
                    disable={isEnable}
                    type="number"
                    nameId="gpa"
                    value={valueStudent?.gpa ?? ""}
                    onChange={handleChange}
                /> */}

                <FormInput
                    label="Emergency Contact Name"
                    disable={isEnable}
                    type="text"
                    nameId="emergencyContactName"
                    value={valueStudent?.emergencyContactName || ""}
                    onChange={handleChange}
                />

                <FormInput
                    label="Emergency Contact Phone"
                    disable={isEnable}
                    type="text"
                    nameId="emergencyContactPhone"
                    value={valueStudent?.emergencyContactPhone || ""}
                    onChange={handleChange}
                />

                {/* Gender */}
                <FormSelection
                    label="Gender"
                    disable={isEnable}
                    nameId="gender"
                    selectValue={valueStudent?.gender || ""}
                    onChange={handleChange}
                    options={[
                        { text: "-- Select Gender --", value: "" },
                        { text: "Male", value: "MALE" },
                        { text: "Female", value: "FEMALE" },
                    ]}
                />

                <FormInput
                    label="National ID"
                    disable={isEnable}
                    type="text"
                    nameId="nationalId"
                    value={valueStudent?.nationalId || ""}
                    onChange={handleChange}
                />

                {/* Status */}
                <FormSelection
                    label="Status"
                    disable={isEnable}
                    nameId="status"
                    selectValue={valueStudent?.status || ""}
                    onChange={handleChange}
                    options={[
                        { text: "-- Select Status --", value: "" },
                        { text: "Active", value: "Active" },
                        { text: "Inactive", value: "Inactive" },
                    ]}
                />

                {/* Department */}
                <FormSelection
                    label="Department"
                    disable={isEnable}
                    nameId="departmentId"
                    selectValue={valueStudent?.departmentId ?? ""}
                    onChange={handleChange}
                    options={[
                        { text: "-- Select Department --", value: "" },
                        ...Object.entries(departmentOption).map(
                            ([text, value]) => ({
                                text,
                                value,
                            }),
                        ),
                    ]}
                />
            </div>
        </div>
    );
};

export default FormFieldStudent;
