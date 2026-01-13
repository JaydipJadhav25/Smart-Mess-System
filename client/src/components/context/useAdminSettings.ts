import { useContext } from "react"
import { AdminContext } from "./AdminSetting"


//custome hook
export const useAdminSettings = () =>{
    const context = useContext(AdminContext);
    //just return all valuse
     if (context === undefined) {
    throw new Error("useAdminSettings  must be used within an AdminProvider");
  }
    return context;

}