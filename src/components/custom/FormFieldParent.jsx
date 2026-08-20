import React from "react";
import { FormInput } from "./FormInput";
import FormSelection from "./FormSelection";

const FormFieldParent = ({
    isEnable,
    valueParent,
    isDisable,
    setValueParent,
}) => {
    // Converts an input date value (e.g. "dd/mm/yyyy" from a text/date picker)
    // into the "yyyy-MM-dd" format expected by the API (@JsonFormat(pattern = "yyyy-MM-dd")).
    const formatToApiDate = (value) => {
        if (!value) return value;

        // Already in API format (yyyy-MM-dd), e.g. from <input type="date" />
        if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

        const parts = value.split("/");
        if (parts.length !== 3) return value;

        const [day, month, year] = parts;
        if (day.length === 2 && month.length === 2 && year.length === 4) {
            return `${year}-${month}-${day}`;
        }
        return value;
    };

    const dateFields = ["fatherDob", "motherDob"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValueParent((prev) => ({
            ...prev,
            [name]: dateFields.includes(name) ? formatToApiDate(value) : value,
        }));
    };
    const provinceNameToCode = {
  "Phnom Penh": "PHNOM_PENH",
  "Banteay Meanchey": "BANTEAY_MEANCHEY",
  "Battambang": "BATTAMBANG",
  "Kampong Cham": "KAMPONG_CHAM",
  "Kampong Chhnang": "KAMPONG_CHHNANG",
  "Kampong Speu": "KAMPONG_SPEU",
  "Kampong Thom": "KAMPONG_THOM",
  "Kampot": "KAMPOT",
  "Kandal": "KANDAL",
  "Koh Kong": "KOH_KONG",
  "Kratie": "KRATIE",
  "Mondulkiri": "MONDULKIRI",
  "Preah Vihear": "PREAH_VIHEAR",
  "Prey Veng": "PREY_VENG",
  "Pursat": "PURSAT",
  "Ratanakiri": "RATANAKIRI",
  "Siem Reap": "SIEM_REAP",
  "Preah Sihanouk": "PREAH_SIHANOUK",
  "Stung Treng": "STUNG_TRENG",
  "Svay Rieng": "SVAY_RIENG",
  "Takeo": "TAKEO",
  "Oddar Meanchey": "ODDAR_MEANCHEY",
  "Kep": "KEP",
  "Pailin": "PAILIN",
  "Tboung Khmum": "TBOUNG_KHMUM",
};
    return (
        <div className="overflow-scroll pb-2">
            <div className="grid grid-cols-2 gap-x-4">
                {/* Father */}
                <FormInput
                    label={"Father Name Kh"}
                    disable={isEnable}
                    type={Text}
                    nameId={"fatherNameKh"}
                    value={valueParent?.fatherNameKh || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Father Name En"}
                    disable={isEnable}
                    type={Text}
                    nameId={"fatherNameEn"}
                    value={valueParent?.fatherNameEn || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Father Phone"}
                    disable={isEnable}
                    type={"text"}
                    nameId={"fatherPhone"}
                    value={valueParent?.fatherPhone || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Father Job"}
                    disable={isEnable}
                    type={"text"}
                    nameId={"fatherJob"}
                    value={valueParent?.fatherJob || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Father Date Of Birth"}
                    disable={isEnable}
                    type={"date"}
                    nameId={"fatherDob"}
                    value={valueParent?.fatherDob || ""}
                    onChange={handleChange}
                />

                {/* Mother */}
                <FormInput
                    label={"Mother Name Kh"}
                    disable={isEnable}
                    type={"text"}
                    nameId={"motherNameKh"}
                    value={valueParent?.motherNameKh || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Mother Name En"}
                    disable={isEnable}
                    type={"text"}
                    nameId={"motherNameEn"}
                    value={valueParent?.motherNameEn || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Mother Phone"}
                    disable={isEnable}
                    type={"text"}
                    nameId={"motherPhone"}
                    value={valueParent?.motherPhone || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Mother Job"}
                    disable={isEnable}
                    type={"text"}
                    nameId={"motherJob"}
                    value={valueParent?.motherJob || ""}
                    onChange={handleChange}
                />
                <FormInput
                    label={"Mother Date Of Birth"}
                    disable={isEnable}
                    type={"date"}
                    nameId={"motherDob"}
                    value={valueParent?.motherDob || ""}
                    onChange={handleChange}
                />

                {/* Address */}
                <FormInput
                    label={"Current Address"}
                    disable={isEnable}
                    type={"text"}
                    nameId={"currentAddress"}
                    value={valueParent?.currentAddress || ""}
                    onChange={handleChange}
                />
                <FormSelection
                    label={"Province"}
                    disable={isEnable}
                    nameId={"province"}
                    value={provinceNameToCode[valueParent?.province] || ""}
                    onChange={handleChange}
                    options={[
                        { text: "-- ជ្រើសរើសរាជធានី/ខេត្ត --" },
                        { text: "ភ្នំពេញ", value: "PHNOM_PENH" },
                        { text: "បន្ទាយមានជ័យ", value: "BANTEAY_MEANCHEY" },
                        { text: "បាត់ដំបង", value: "BATTAMBANG" },
                        { text: "កំពង់ចាម", value: "KAMPONG_CHAM" },
                        { text: "កំពង់ឆ្នាំង", value: "KAMPONG_CHHNANG" },
                        { text: "កំពង់ស្ពឺ", value: "KAMPONG_SPEU" },
                        { text: "កំពង់ធំ", value: "KAMPONG_THOM" },
                        { text: "កំពត", value: "KAMPOT" },
                        { text: "កណ្ដាល", value: "KANDAL" },
                        { text: "កោះកុង", value: "KOH_KONG" },
                        { text: "ក្រចេះ", value: "KRATIE" },
                        { text: "មណ្ឌលគិរី", value: "MONDULKIRI" },
                        { text: "ព្រះវិហារ", value: "PREAH_VIHEAR" },
                        { text: "ព្រៃវែង", value: "PREY_VENG" },
                        { text: "ពោធិ៍សាត់", value: "PURSAT" },
                        { text: "រតនគិរី", value: "RATANAKIRI" },
                        { text: "សៀមរាប", value: "SIEM_REAP" },
                        { text: "ព្រះសីហនុ", value: "PREAH_SIHANOUK" },
                        { text: "ស្ទឹងត្រែង", value: "STUNG_TRENG" },
                        { text: "ស្វាយរៀង", value: "SVAY_RIENG" },
                        { text: "តាកែវ", value: "TAKEO" },
                        { text: "ឧត្តរមានជ័យ", value: "ODDAR_MEANCHEY" },
                        { text: "កែប", value: "KEP" },
                        { text: "ប៉ៃលិន", value: "PAILIN" },
                        { text: "ត្បូងឃ្មុំ", value: "TBOUNG_KHMUM" },
                    ]}
                />
            </div>
        </div>
    );
};

export default FormFieldParent;
