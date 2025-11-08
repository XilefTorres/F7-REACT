import { SET_OPTION, FULLSCREEN } from "../src/utils/lib/utils.js";
import HomePage from "./Modules/Home.jsx";
import UsersPage from "./Modules/Users.jsx";
import Ownerships from "./Modules/Ownerships.jsx";
import Branches from "./Modules/Branches.jsx";
import Data from "./Modules/Data.jsx"; 
import Clients from "./Modules/Clients.jsx";
import SquareUsers from "./Modules/SquareUsers.jsx";
import Settings from "./Modules/Settings.jsx";
import Account from "./Modules/Account.jsx";
import Projects from "./Modules/Projects.jsx";
import ProjUsers from "./Modules/ProjUsers.jsx";

export default [
  {
    path: "/",
    component: HomePage,
    on: {
      pageInit: async (ctx) => {
        SET_OPTION("home");
      },
    },
  },
  {
    path: "/users",
    component: UsersPage,
    on: {
      pageInit: async (ctx) => {
        SET_OPTION("users");
      },
    },
  },

  {
    path: "/ownerships",
    component: Ownerships,
    on: {
      pageInit: async (ctx) => {
        SET_OPTION("ownerships");
      },
    },
  },

  {
    path: "/branchoffice",
    component: Branches,
    on: {
      pageInit: async (ctx) => {
        SET_OPTION("branchoffice");
      },
    },
  },

  {
    path: "/data",
    component: Data,
    on: {
      pageInit: async (ctx) => {
        SET_OPTION("data");
      },
    },
  },

  {
    path: "/clients",
    component: Clients,
    on: {
      pageInit: async (ctx) => {
        SET_OPTION("clients");
      },
    },
  },

  {
    path: "/squareusers",
    component: SquareUsers,
    on: {
      pageInit: async (ctx) => {
        SET_OPTION("squareusers");
      },
    },
  },

  {
    path: "/settings",
    component: Settings,
    on: {
      pageInit: async (ctx) => {
        SET_OPTION("settings");
      },
    },
  },

  {
    path: "/account",
    component: Account,
    on: {
      pageInit: async (ctx) => {
        SET_OPTION("account");
      },
    },
  },

  {
    path: "/projects",
    component: Projects,
    on: {
      pageInit: async (ctx) => {
        SET_OPTION("projects");
      },
    },
  },

  {
    path: "/projUsers",
    component: ProjUsers,
    on: {
      pageInit: async (ctx) => {
        SET_OPTION("projUsers");
      },
    },
  },
];
