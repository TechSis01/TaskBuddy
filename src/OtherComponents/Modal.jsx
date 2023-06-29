import { createPortal } from "react-dom";
import FormField from "../Authentication/FormField";
import TopHeader from "../Authentication/TopHeader";
import Button from "../Button";
import { GiCancel } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
function Modal({ modalState, modalStateFunc }) {
  return createPortal(
    <section className="modalContainer absolute top-0 w-full h-screen bg-black bg-opacity-50">
      <div className="modalContent bg-white text-black w-6/12 mx-auto mt-20 p-8 rounded-md shadow-xl">
        <div className="flex justify-between">
          <TopHeader text="Add a Profile Picture" style="ml-2 font-semibold" />
          <div onClick={modalStateFunc} className="cursor-pointer">
            <GiCancel />
          </div>
        </div>
        <FormField text="file" style="mb-4" />
        <textarea
          className="border-2 outline-none rounded-md ml-2 p-2"
          rows="5"
          cols="60"
          placeholder="Let's get to know you..."
        ></textarea>
        <div className="flex ">
          <FormField text="text" textPlaceholder="Add Skill" style="mb-4" />
          <div className=" bg-gray-1">
            <AiOutlinePlus />
          </div>
        </div>
        <div className="flex ">
          <FormField text="text" textPlaceholder="Add Hobby" style="mb-4 mt-4" />
          <div className=" mt-4 bg-gray-1">
            <AiOutlinePlus />
          </div>
        </div>
        <Button
          btnText="Save"
          style="ml-2 bg-green text-white px-7 py-2 rounded-md"
        />
      </div>
    </section>,
    document.getElementById("modal")
  );
}

export default Modal;
