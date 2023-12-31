import { IoMdHome } from "react-icons/io";
import { PiWarningCircleFill } from "react-icons/pi";
import { TbCheckbox } from "react-icons/tb";
import { GiNotebook } from "react-icons/gi";

const menu = [
  {
    id: 1,
    title : "All tasks",
    icon: <IoMdHome />,
    link: "/"
  },
  {
    id: 2,
    title : "Important!",
    icon: <PiWarningCircleFill />,
    link: "/important"
  },
  {
    id: 3,
    title : "Completed",
    icon: <TbCheckbox />,
    link: "/completed"
  },
  {
    id: 4,
    title: "Do it Now",
    icon: <GiNotebook />,
    link: "/incomplete"
  }
]

export default menu