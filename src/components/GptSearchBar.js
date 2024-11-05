// import { useRef } from "react";
// import openai from "../utils/opeai";

// const GptSearchBar = () => {
//   const searchText = useRef(null);

//   const handleGptSearchClick = async () => {
//     console.log("searchText : ", searchText.current.value);
//     const gptQuery =
//       "Act a as movie recommendation system and suggest some movies for the query" +
//       searchText.current.value +
//       ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Godar, Sholay, Koi Mil Gaya, Pathan, Ra-One";
//     const gptResults = await openai.chat.completions.create({
//       messages: [{ role: "user", content: gptQuery }],
//       model: "gpt-3.5-turbo",
//     });
//     console.log("gptResults : ", gptResults.choices);
//   };

//   return (
//     <div className="flex w-full p-10 items-center justify-center">
//       <form
//         className="flex w-1/2 items-center justify-center"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
//           ref={searchText}
//           className="w-8/12 px-5 py-3 rounded-lg shadow-md shadow-white"
//           type="text"
//           placeholder="What you want to wantch now.."
//         />
//         <button
//           className="w-2/12 mx-2 px-5 py-3 bg-[#E50914] text-white md:text-md font-bold rounded-lg shadow-md shadow-[#E50914]"
//           onClick={handleGptSearchClick}
//         >
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };

// export default GptSearchBar;
