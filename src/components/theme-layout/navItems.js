import QrCodeIcon from "@mui/icons-material/QrCode";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SettingsIcon from "@mui/icons-material/Settings";

export const navItems = [
  { icon: QrCodeIcon, label: "SKU", path: "/sku" },
  {
    icon: DashboardIcon,
    label: "Dashboard",
    path: "/dashboard",
    children: [
      { label: "Analytics", path: "/dashboard/analytics" },
      { label: "Reports", path: "/dashboard/reports" },
      { label: "Statistics", path: "/dashboard/statistics" },
    ],
  },
  { icon: PersonIcon, label: "Profile", path: "/profile" },
  {
    icon: InfoIcon,
    label: "About",
    path: "/about",
    children: [
      { label: "Company", path: "/about/company" },
      { label: "Team", path: "/about/team" },
      { label: "History", path: "/about/history" },
      { label: "Mission", path: "/about/mission" },
    ],
  },
  { icon: ContactMailIcon, label: "Contact", path: "/contact" },
  {
    icon: SettingsIcon,
    label: "Settings",
    path: "/settings",
    children: [
      { label: "General", path: "/settings/general" },
      { label: "Security", path: "/settings/security" },
      { label: "Notifications", path: "/settings/notifications" },
    ],
  },
]; 