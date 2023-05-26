import React from "react";

function FormField({
  text,
  textPlaceholder,
  message,
  style,
  register
}) {
  return (
    <div>
      <input
        type={text}
        placeholder={textPlaceholder}
        className={`border outline-none border-gray-1 py-2 px-2 rounded-md ring-0 ${style}`}
        onChange={register}
      ></input>
      <label className="ml-2">{message}</label>
    </div>
  );
}

export default FormField;
