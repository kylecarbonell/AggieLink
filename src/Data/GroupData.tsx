import {
  FaHiking,
  FaTableTennis,
  FaVolleyballBall,
  FaBasketballBall,
  FaBookOpen,
  FaCoffee
} from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { MdScience } from "react-icons/md";
import { FaComputer } from "react-icons/fa6";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import { IoMdRestaurant } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import { GiBoba } from "react-icons/gi";
import { BiMath } from "react-icons/bi";

import React from "react";

export const groupTypes: Array<string> = ["Sports", "Study Groups", "Coffee", "Food", "Other"];



export const cities = [
  "Davis, Ca",
  "San Francisco, Ca",
  "San Jose, Ca",
  "Milpitas, Ca",
  "Palo Alto, Ca",
  "Sacramento, Ca",
];

export const call = "https://aggielink.onrender.com";

// export const call = "http://localhost:8000"

export const events: Record<string, string[]> = {
  Sports: ["Volleyball", "Basketball", "Hiking", "Pickleball", "Gym"],
  "Study Groups": [
    "Math",
    "English",
    "Science",
    "Engineering",
  ],
  Coffee: ["Coffee Shop"],
  Food: ["Restaurant", "Boba", "Fast Food"],
  Other: [],
};

function getIcon(event) {
  switch (event) {
    case "Volleyball":
      return <FaVolleyballBall />
    case "Basketball":
      return <FaBasketballBall />
    case "Hiking":
      return <FaHiking />
    case "Pickleball":
      return <FaTableTennis />
    case "Gym":
      return <CgGym />
    case "Math":
      return <BiMath />
    case "English":
      return <FaBookOpen />
    case "Science":
      return <MdScience />
    case "Engineering":
      return <FaComputer />
    case "Coffee Shop":
      return <FaCoffee />
    case "Restaurant":
      return <IoMdRestaurant />
    case "Boba":
      return <GiBoba />
    case "Fast Food":
      return <IoFastFood />






    default:
      return <TbDotsCircleHorizontal />
  }



}

export default getIcon