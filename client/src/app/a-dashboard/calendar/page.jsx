"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getUserById } from "../../../app/redux/features/user/userActions";

import { TbPointFilled } from "react-icons/tb";

import { useRouter } from "next/navigation";

import { notifyError } from "../../../components/notifyError/NotifyError";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Page = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [dayObj, setDayObj] = useState({});
  let errorIndicator = false;
  let errorIndicatorPost=false;
  let actionIndicator = ""
  const router = useRouter();
  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const [userTimeAv, setUserTimeAv] = useState(
    user.logedInUser.timeAvailabilities || []
  );
  const [newException, setNewException] = useState({ date: "" });
  const URL_BASE = "http://localhost:3001";
  const [showHours, setShowHours] = useState({});
  const [moreTime, setMoreTime] = useState({});
  const [moreExceptionTime, setMoreExceptionTime] = useState(false);

  //console.log(user.logedInUser.userType);

  useEffect(() => {
    // if (!user.userType) {
    //   router.replace("/auth");
    // } else if (user.userType !== "artist") {
    //   router.replace("/");
    // }

    let obj = {};
    let objH = {};
    let secondObj = {};
    user.logedInUser.timeAvailabilities?.map((timeAvailability) => {
      obj[timeAvailability.day] = {
        initialHour: timeAvailability.initialHour,
        finalHour: timeAvailability.finalHour,
        secondInitialHour:
          timeAvailability.secondInitialHour || timeAvailability.finalHour,
        secondFinalHour: timeAvailability.secondFinalHour || null,
        id: timeAvailability.id,
      };
      if (timeAvailability.initialHour) objH[timeAvailability.day] = true;
      if (
        timeAvailability.secondInitialHour &&
        timeAvailability.secondFinalHour
      )
        secondObj[timeAvailability.day] = true;
    });
    setDayObj({ ...obj });
    setShowHours({ ...objH });
    setMoreTime({ ...secondObj });
  }, [user]);

  useEffect(() => {
    let array = [];
    for (let day in dayObj) {
      if (dayObj[day])
        array.push({
          day,
          initialHour: dayObj[day].initialHour,
          secondInitialHour: dayObj[day].secondInitialHour || null,
          secondFinalHour: dayObj[day].secondFinalHour || null,
          finalHour: dayObj[day].finalHour,
          id: dayObj[day].id,
        });
    }
    setUserTimeAv(array);
  }, [dayObj]);

  const generateTimeOptions = () => {
    let options = [];
    let initial = 6;
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateSecondTimeOptions = (day) => {
    let options = [];
    let initial = dayObj[day]?.finalHour?.split(":")[0];
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateTimeOptionsException = () => {
    let options = [];
    let initial = Number(newException?.initialHour?.split(":")[0]) || 6;
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateSecondFinalException = () => {
    let options = [];
    let initial = Number(newException?.secondInitialHour?.split(":")[0]);
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateSecondException = () => {
    let options = [];
    let initial = Number(newException?.finalHour?.split(":")[0]);
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateFinalTimeOptions = (day) => {
    let options = [];
    let initial = Number(dayObj[day]?.initialHour?.split(":")[0] || 6);
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateSecondFinalTimeOptions = (day) => {
    let options = [];
    let initial = Number(dayObj[day]?.secondInitialHour?.split(":")[0]);
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const handleInitialTimeChange = (weekDay, initialHour) => {
    setDayObj({
      ...dayObj,
      [weekDay]: { ...dayObj[weekDay], initialHour },
    });
  };

  const handleSecondInitialTimeChange = (weekDay, secondInitialHour) => {
    setDayObj({
      ...dayObj,
      [weekDay]: { ...dayObj[weekDay], secondInitialHour },
    });
  };

  const handleFinalTimeChange = (weekDay, finalHour) => {
    setDayObj({
      ...dayObj,
      [weekDay]: {
        ...dayObj[weekDay],
        finalHour,
        secondInitialHour: finalHour,
      },
    });
  };

  const handleSecondFinalTimeChange = (weekDay, secondFinalHour) => {
    setDayObj({
      ...dayObj,
      [weekDay]: { ...dayObj[weekDay], secondFinalHour },
    });
  };

  const saveTimeAvailability = async () => {
    try {
      for (const {
        day,
        initialHour,
        finalHour,
        secondFinalHour,
        secondInitialHour,
        id,
      } of userTimeAv) {
        if (id) {
          const data = {
            day,
            initialHour,
            finalHour,
            secondFinalHour: secondFinalHour || null,
            secondInitialHour: secondInitialHour || null,
          };
          try {
            await axios.put(`${URL_BASE}/timeAvailabilities/${id}`, data);
            actionIndicator = "update"
          } catch (error) {
            console.log(error);
            errorIndicator = true;
          }
        } else if (initialHour && finalHour) {
          let data = {};
          if (secondInitialHour && secondFinalHour) {
            data = {
              tattooArtistId: user.logedInUser.id,
              day,
              initialHour,
              finalHour,
              secondFinalHour,
              secondInitialHour,
            };
          } else {
            data = {
              tattooArtistId: user.logedInUser.id,
              day,
              initialHour,
              finalHour,
            };
          }
          try {
            await axios.post(`${URL_BASE}/timeAvailabilities`, data);
            actionIndicator = "create"
          } catch (error) {
            console.error(error)
            errorIndicatorPost=true
          }
        }
       
      }
      if (!errorIndicator && actionIndicator=="update") {
        toast.success(`Cambios guardados con éxito`, {
          className: "toastSuccess",
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });} else if (!errorIndicatorPost && actionIndicator=="create") {
          toast.success(`Cambios creados con éxito`, {
            className: "toastSuccess",
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });} else if (errorIndicatorPost && actionIndicator=="create") {
            toast.error(`Error al registrar sus horarios`, {
              className: "toastError",
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000,
              hideProgressBar: false,
            });} else if (errorIndicatorPost && actionIndicator=="update") {
              toast.error(`Error al guardar sus cambios`, {
                className: "toastError",
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
              });}
      dispatch(getUserById(user.fireBaseUser.tokenId));
    } catch (error) {
      notifyError("Error al guardar el horario:", error);
    }
  };

  const handleExceptionChange = (event) => {
    if (event.target.value && event.target.name == "date") {
      setNewException({
        [event.target.name]: event.target.value,
      });
    } else if (event.target.name == "finalHour") {
      setNewException({
        ...newException,
        [event.target.name]: event.target.value,
        secondInitialHour: event.target.value,
      });
    } else {
      setNewException({
        ...newException,
        [event.target.name]: event.target.value,
      });
    }
  };

  useEffect(() => {}, [newException]);

  const addTimeException = async () => {
    try {
      if (newException.initialHour == "No trabajo") {
        await axios.post(`${URL_BASE}/timeAvailabilityExceptions`, {
          date: newException.date,
          tattooArtistId: user.logedInUser.id,
        });
      } else if (
        newException.secondInitialHour &&
        !newException.secondFinalHour
      ) {
        await axios.post(`${URL_BASE}/timeAvailabilityExceptions`, {
          date: newException.date,
          initialHour: newException.initialHour,
          finalHour: newException.finalHour,
          tattooArtistId: user.logedInUser.id,
        });
      } else {
        await axios.post(`${URL_BASE}/timeAvailabilityExceptions`, {
          ...newException,
          tattooArtistId: user.logedInUser.id,
        });
      }

      dispatch(getUserById(user.fireBaseUser.tokenId));

      setNewException({ date: "" });
      toast.success("Cambios guardados con éxito", {
        className: "toastSuccess",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      toast.error("Error al guardar cambios", {
        className: "toastError",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  const deleteHourDay = (day) => {
    setDayObj({
      ...dayObj,
      [day]: { initialHour: null, finalHour: null, id: dayObj[day]?.id },
    });
    setShowHours({
      ...showHours,
      [day]: false,
    });
  };

  const deleteException = async (id) => {
    const response = await axios.delete(
      `${URL_BASE}/timeAvailabilityExceptions/${id}`
    );
    dispatch(getUserById(user.fireBaseUser.tokenId));
  };

  return (
    <div className="bg-secondary-900 rounded w-full shadow-lg shadow-artist">
      <div className=" text-center">
      <div className="w-full px-10 mb-10 ">
  <h1 className="text-4xl font-rocksalt w-full py-10 text-left ">Disponibilidad Horaria</h1>
  <p className="text-left mb-1">Establecer o modificar horarios <a href="#horarios" className="text-artist underline"> aquí</a></p> 
  <p className="text-left mb-5 pb-2 border-transparent border-b-artist/30 border-[1px]">Añadir excepciones <a href="#excepciones" className="text-artist underline   "> aquí </a></p>
</div>
        <div className="flex items-center justify-center ">
          
        </div>

        {days.map((day) => {
          return (
            <div key={day} className="" id="horarios">
              <h4 className="text-xl mb-4 font-rocksalt">{day}</h4>
              {showHours[day] ? (
                <div className="">
                  <div className="flex justify-center items-center gap-[25px] p-3">
                    <label>
                      Inicio:
                      <select
                        className="bg-transparent border-[1px] border-artist/50 ml-4 rounded-md p-2"
                        defaultValue={dayObj[day]?.initialHour || ""}
                        onChange={(e) =>
                          handleInitialTimeChange(day, e.target.value)
                        }
                      >
                        <option className="bg-transparent " value="" disabled>
                          Horario inicial
                        </option>
                        {generateTimeOptions()}
                      </select>
                    </label>

                    <label>
                      Fin:
                      <select
                        className="bg-transparent border-[1px] border-artist/40 ml-4 rounded-md p-2"
                        defaultValue={dayObj[day]?.finalHour || ""}
                        onChange={(e) =>
                          handleFinalTimeChange(day, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Horario final
                        </option>
                        {generateFinalTimeOptions(day)}
                      </select>
                    </label>
                  </div>

                  {moreTime[day] && (
                    <div className="flex items-center justify-center gap-[25px] mt-6">
                      <label>
                        Inicio:
                        <select
                          className="bg-transparent border-[0.5px] border-artist/40 ml-4 rounded-md p-2"
                          defaultValue={dayObj[day]?.secondInitialHour || ""}
                          onChange={(e) =>
                            handleSecondInitialTimeChange(day, e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Horario inicial
                          </option>
                          {generateSecondTimeOptions(day)}
                        </select>
                      </label>

                      <label>
                        Fin:
                        <select
                          className="bg-transparent border-[1px] border-artist/40 ml-4 rounded-md p-2"
                          defaultValue={dayObj[day]?.secondFinalHour || ""}
                          onChange={(e) =>
                            handleSecondFinalTimeChange(day, e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Horario final
                          </option>
                          {generateSecondFinalTimeOptions(day)}
                        </select>
                      </label>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setMoreTime({ ...moreTime, [day]: !moreTime[day] });
                      handleSecondInitialTimeChange(day, null);
                      handleSecondFinalTimeChange(day, null);
                    }}
                    className="mr-4 mb-4 mt-4"
                  >
                    {moreTime[day] ? "➖" : "➕"}
                  </button>

                  <button onClick={() => deleteHourDay(day)}>❌</button>
                  <hr className="mt-6 mb-6 w-[50%] border-artist/50 mx-auto"></hr>
                </div>
              ) : (
                <button
                  onClick={() => setShowHours({ ...showHours, [day]: true })}
                  className="w-[30%] rounded outline  mb-4 transition-transform hover:scale-110  "
                >
                  Agregar horario:
                </button>
              )}
            </div>
          );
        })}
        <button
          onClick={saveTimeAvailability}
          className="hover:bg-artist font-rocksalt gap-1 border-artist text-gray-300 border-[1px] px-2 py-3 rounded-md cursor-pointer my-2"
        >
          Guardar Horarios
        </button>
      </div>
      <div className="flex items-center justify-center">
        <hr className="mt-6 mb-6 w-[90%] border-artist/50"></hr>
      </div>

      <div className="text-center" id="excepciones"> 
      <div className="w-full px-10 mb-10 ">
        <h3 className="text-4xl font-rocksalt w-full py-10 text-left">
          Excepciones
        </h3>
        </div>
        <ul className="ml-10 mt-4">
          <li className="mt-2 flex gap-2 text-artistfont">
            <TbPointFilled className="text-artist" />
            Si en alguna fecha específica vas a trabajar en un horario diferente
            al normal, agrégala aquí.
          </li>
          <li className="mt-2 flex gap-2 text-artistfont">
            <TbPointFilled className="text-artist" />
            Selecciona la fecha especial e ingresa el horario en el que SÍ vas a
            trabajar.
          </li>
          <li className="mt-2 flex gap-2 text-artistfont">
            <TbPointFilled className="text-artist" />
            En caso de que en la fecha específica no vayas a trabajar,
            selecciona la opción "No trabajo" en el apartado de hora inicial.
          </li>
        </ul>
        <div className="flex items-center justify-center mt-10">
          <input
            type="date"
            name="date"
            value={newException?.date}
            onChange={handleExceptionChange}
            className="bg-transparent border-[1px] border-artist/50 rounded-md text-center p-2"
          />
        </div>
        {newException.date && (
          <div className=" flex items-center justify-center mt-4 mb-4 gap-[25px]">
            <label>
              Inicio:
              <select
                name="initialHour"
                defaultValue=""
                onChange={handleExceptionChange}
                className="bg-transparent border-[1px] border-artist/60 rounded-md p-2"
              >
                <option value="">Horario inicial</option>
                {generateTimeOptions()}
                <option value="No trabajo">No trabajo</option>
              </select>
            </label>
            {newException?.initialHour !== "No trabajo" && (
              <label>
                Fin:
                <select
                  name="finalHour"
                  defaultValue=""
                  onChange={handleExceptionChange}
                  className="bg-transparent border-[1px] border-artist/60 rounded-md p-2"
                >
                  <option>Horario final</option>
                  {generateTimeOptionsException()}
                </select>
              </label>
            )}
          </div>
        )}

        {newException.initialHour && newException.finalHour && (
          <div className="text-center">
            <button onClick={() => setMoreExceptionTime(!moreExceptionTime)}>
              {moreExceptionTime ? "➖" : "➕"}
            </button>

            {moreExceptionTime && (
              <div>
                <label>
                  Inicio:
                  <select
                    name="secondInitialHour"
                    className="bg-transparent border-[1px] border-artist/60 rounded-md p-2"
                    onChange={handleExceptionChange}
                  >
                    <option value="" disabled>
                      Horario inicial
                    </option>
                    {generateSecondException()}
                  </select>
                </label>

                <label>
                  Fin:
                  <select
                    name="secondFinalHour"
                    className="bg-transparent border-[1px] border-artist/60 rounded-md p-2"
                    onChange={handleExceptionChange}
                  >
                    <option value="" disabled>
                      Horario final
                    </option>
                    {generateSecondFinalException()}
                  </select>
                </label>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center justify-center mt-8 mr-6">
          <button
            onClick={addTimeException}
            className="hover:bg-artist font-rocksalt gap-1 border-artist text-gray-300 border-[1px] px-2 py-3 rounded-md cursor-pointer mb-4 ml-4"
            disabled={
              !newException.initialHour ||
              (!newException.finalHour &&
                newException.initialHour !== "No trabajo")
            }
          >
            Añadir Excepción
          </button>
        </div>

        {user.logedInUser.timeAvailabilityExceptions?.length && (
          <div className="text-center">
            {user.logedInUser.timeAvailabilityExceptions.map(
              (exception, index) => (
                <div key={index}>
                  <button
                    onClick={() => deleteException(exception.id)}
                    className="mr-2"
                  >
                    ❌
                  </button>
                  Fecha: {exception.date},
                  {exception.initialHour && exception.finalHour ? (
                    <div>
                      <p>
                        Inicio: {exception.initialHour}, Fin:{" "}
                        {exception.finalHour}
                      </p>
                      {exception.secondInitialHour &&
                        exception.secondFinalHour && (
                          <p>
                            Inicio: {exception.secondInitialHour}, Fin:{" "}
                            {exception.secondFinalHour}
                          </p>
                        )}
                    </div>
                  ) : (
                    <p>Fecha no laboral</p>
                  )}
                  <div className="flex items-center justify-center ">
                    {/* <hr className="mt-6 mb-6 w-[90%] border-secondary-100"></hr> */}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
