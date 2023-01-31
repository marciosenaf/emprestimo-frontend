import {AiFillHome} from "react-icons/ai"
import { FaCommentAlt } from "react-icons/fa"
import { RiLockPasswordFill } from "react-icons/ri"
import {GiMoneyStack} from "react-icons/gi"


const menu = [

  {
    title: "Empréstimo",
    icon: <GiMoneyStack style={{ color: '#0a1930', }} title="Inventory" />,
    path: "/inventory",
  },
  {
    title: "Trocar Senha",
    icon: <RiLockPasswordFill style={{ color: '#0a1930', }} title="Change Password" />,
    path: "/change-password",
},
{
  title: "Menu",
  icon: <AiFillHome style={{ color: '#0a1930', }} title="Home" />,
  path: "/",
},

];

export default menu;
