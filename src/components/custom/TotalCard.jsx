//-Path: "\vite\src\components\custom\TotalCard.jsx"

const TotalCard = ({ title, value, type, icon: Icon }) => {
    const colors = {
        teacher:
            "bg-purple-100  text-purple-500 dark:bg-purple-500 dark:text-purple-200",
        student: "bg-sky-100 text-sky-500 dark:bg-sky-500 dark:text-sky-200",
        class: "bg-green-100 text-green-500 dark:bg-green-500  dark:text-green-200",
    };

    return (
        <div className="bg-white1 shadow-sm rounded-lg py-4 md:py-6 p-3 md:p-3 flex gap-3 md:gap-4">
            <div className="w-[25%] flex items-center justify-center">
                <div
                    className={`flex items-center justify-center ${colors[type]} rounded-full h-10 w-10 `}
                >
                    <Icon className="h-5 w-5 md:h-5 md:w-5" />
                </div>
            </div>
            <div>
                <div>
                    <div className="font-bold text-sm md:text-base">
                        {value}
                    </div>
                    <div className="text-gray-400 text-xs md:text-sm">
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalCard;
