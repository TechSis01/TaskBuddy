import React from "react";

function FormField({
  text,
  textPlaceholder,
  message,
  style,
  register,
  name,
  value
}) {
  return (
    <div className="flex items-center">
      <label className="mr-2">{message}</label>
      <input
        type={text}
        placeholder={textPlaceholder}
        className={`border outline-none border-gray-1 py-2 px-2 rounded-md ring-0 ${style}`}
        onChange={register}
        name={name}
        value={value}
      ></input>
    </div>
  );
}

export default FormField;
