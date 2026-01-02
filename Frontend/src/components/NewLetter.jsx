import React from "react";

const NewLetter = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium  text-gray-800">
        Suscribe now 
      </p>
      <p className="text-gray-400 mt-3">
        The best offer you can get is with speedtouch cleaning and hygine
        service
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6  border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none "
          type="email"
          placeholder="Enter you email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10  py-4"
        >
          SUSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewLetter;
