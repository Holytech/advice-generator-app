import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    setIsLoading(true);
    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        setAdvice(res.data.slip);
        console.log(res.data.slip);
        setIsLoading(false);
        setError(null);
      })
      .catch(function (error) {
        if (error.response) {
          setError(`
          <div className="flex items-center justify-center flex-col p-12 gap-12 text-red-600 text-xl border border-red-600">
            <div>${error.response.data}</div>
            <div>${error.response.status}</div>
            <div>${error.response.headers}</div>
          </div>
        `);
          setIsLoading(false);
        } else if (error.request) {
          setError(`
          <div className="flex items-center justify-center flex-col p-12 gap-12 text-red-600 text-xl border border-red-600">
            <div>${error.request}</div>
          </div>
          `);
          setIsLoading(false);
        } else {
          setError(`
          <div className="flex items-center justify-center flex-col p-12 gap-12 text-red-600 text-xl border border-red-600">
            <div>${error.message}</div>
          </div>
          `);
          setIsLoading(false);
        }
      });
  };
  return (
    <>
      <div className="w-full h-[100vh] bg-[#202733] flex justify-center items-center md:px-4">
        <div className="lg:w-1/3 py-16 px-8 lg:min-w-[540px] lg:max-w-[540px] bg-[#313A48] rounded-xl flex flex-col justify-center items-center gap-21 text-center md:mx-8">
          {isLoading ? (
            <Loading />
          ) : error ? (
            {error}
          ): (
            <>
              <p className="text-[#53FFAA] font-manrope tracking-widest mb-6">
                ADVICE #{advice.id}
              </p>
              <h1
                className="text-[#CEE3E9] font-manrope text-xl mb-7"
                key={advice.id}
              >
                "{advice.advice}"
              </h1>
            </>
          )}
          <img src="/line.png" alt="line" />
          <img
            src="/die_oval.png"
            alt="die_oval"
            className="die_oval cursor-pointen rounded-full relative top-24"
            onClick={() => fetchAdvice()}
          />
        </div>
      </div>
    </>
  );
}

export default App;
