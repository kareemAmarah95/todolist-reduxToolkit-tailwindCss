import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";
import { updateTodo } from "../features/todo/todoSlice";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { todoSlice } from "../features/todo/todoSlice";
const Todos = () => {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <>
      <ul className="list-none">
        {todos.map((todo, index) => (
          <React.Fragment key={index}>
            {edit && id === todo.id && (
              <>
                <input
                  type="text"
                  className="mt-5 mr-5 bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Update a Todo"
                  onChange={(e) => setUpdatedText(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={() => {
                    dispatch(updateTodo({ id: todo.id, text: updatedText }));
                    setEdit(false);
                  }}
                >
                  Update Todo
                </button>
              </>
            )}

            <li className="mt-4 mx-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded">
              <div className="text-white">{todo.text}</div>
              <div className="flex ">
                <div className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none  rounded text-md mr-3">
                  <RiCloseCircleLine
                    onClick={() => dispatch(removeTodo(todo.id))}
                  />
                </div>
                <div className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none  rounded text-md">
                  <TiEdit
                    onClick={() => {
                      setEdit(true);
                      setId(todo.id);
                    }}
                  />
                </div>
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default Todos;
