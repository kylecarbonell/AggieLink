
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

export const groupTypes = ["Sports", "Study Groups", "Coffee", "Food"];



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
  Sports: ["Volleyball", "Basketball", "Hiking", "Pickleball", "Gym", "Other"],
  "Study Groups": [
    "Math",
    "English",
    "Science",
    "Engineering",
    "Other",
  ],
  Coffee: ["Coffee Shop"],
  Food: ["Restaurant", "Boba", "Fast Food"],
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






    case "Other":
      return <TbDotsCircleHorizontal />
  }



}

export default getIcon