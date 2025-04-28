import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const AlertMessage = ({ type, message }) => {
  let icon;
  let colorClass;

  switch (type) {
    case "error":
      icon = <AiOutlineCloseCircle className="text-red-500 text-2xl" />;
      colorClass = "bg-red-50 border border-red-400 text-red-700";
      break;
    case "success":
      icon = <AiOutlineCheckCircle className="text-green-500 text-2xl" />;
      colorClass = "bg-green-50 border border-green-400 text-green-700";
      break;
    case "loading":
      icon = (
        <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-2xl" />
      );
      colorClass = "bg-blue-50 border border-blue-400 text-blue-700";
      break;
    default:
      icon = null;
  }

  return (
    <div
      className={`flex items-center p-4 rounded-lg shadow-md ${colorClass} space-x-4 transition-all duration-300`}
    >
      {icon}
      <span className="text-base font-semibold">{message}</span>
    </div>
  );
};

export default AlertMessage;
