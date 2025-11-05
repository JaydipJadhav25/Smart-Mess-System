import AdminLayout from "@/components/admin/AdminLayout";
import  { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Clock, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";

import { useMutation, useQuery  , useQueryClient} from "@tanstack/react-query";
// import { number } from "framer-motion";
import {useForm} from "react-hook-form"

import { axiosInstance } from "@/config/axiosInstances";



const AdminAnnouncements = () => {



  
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const[oldAnnouncement , setOldAccouncement] = useState<any>(null);

  //update state


const {register , handleSubmit , reset} = useForm();
  const queryClient = useQueryClient();

  //react-query
const { isError, isLoading, data, error } = useQuery({
  queryKey: ["adminanncements"],
  queryFn: async () => {
    const response = await axiosInstance("/open/announcements");
    console.log("api call ......................................");
    return response.data;
  },
  staleTime: 5 * 60 * 1000,      // 5 minutes = 300000 ms
  gcTime: 5 * 60 * 1000,         // cache garbage collect after 5 min
  refetchOnWindowFocus: false,   // don't refetch when switching tabs
  refetchOnReconnect: false,     // don't refetch on network reconnect
  refetchOnMount: false,         // don't refetch on remount
});




//create
 const mutation = useMutation({
    mutationFn : async(formData)=>{
     const responce = await axiosInstance.post("/admin/announcements" ,formData );
    return responce.data;
    },
    onSuccess : async(data : any)=>{
          console.log("annceuncement add successfully : " , data);
         alert("Announcement add successfully ")
          
          // refresh the members list
        
          queryClient.invalidateQueries({ queryKey: ["adminanncements"] });
          //close         
          setShowForm(false);
                  
      // clear form after success
      reset();


    //   // //add activity => not good way
    //    await axiosInstance.post("/admin/activities" ,{
    //   action : "Add New Announcement"
    //  });
    // //reset
    //  queryClient.invalidateQueries({ queryKey: ["activities"] });
    
    //good way 
   




    } ,
    onError : async(error)=>{
         console.error("Error adding anncements:", error);
         alert("Error adding anncements:");
         // clear form after success
      reset();

  
    

    }
  });



  //use mutation -delete // in future i will use optimistic update
  const mutationDelete = useMutation({
     mutationFn : async(id)=>{
         const response = await axiosInstance.post("/admin/announcement/delete" , { id});
         return response.data;
     },
     onMutate :async (id) =>{
             //cancel query fetch
             await queryClient.cancelQueries({queryKey :["adminanncements"]})

             //get previose data for rollback
             const previoseData = queryClient.getQueryData(["adminanncements"]);
            console.log("previoseData :" , previoseData);

             queryClient.setQueryData(["adminanncements"], (old: any[] = []) => {
              return old.filter(item => item._id !== id);
            });
            
            //return
            return { previoseData};

     },
     onSuccess : (data)=>{
       console.log("announcement deleted successfully......." , data);
       alert("Announcement delete Successfully !");   
          // refresh the 
          queryClient.invalidateQueries({ queryKey: ["adminanncements"] });
     
           


     },
      onError : (error ,id , context)=>{
         console.error("Error announcement member:", error);
         alert("Announcement Delete member!");
  

      console.log("userid : " , id);
      queryClient.setQueryData(["adminanncements"] , context?.previoseData);

    },
    onSettled : ()=>{
          queryClient.invalidateQueries({ queryKey: ["adminanncements"] });

    }

  });



   //use mutation  update announcement
  const mutationUpdate = useMutation({
     mutationFn : async(data)=>{
      console.log("data : " , data);
         const response = await axiosInstance.post("/admin/announcement/update" ,  data );
         return response.data;

        // console.log("data update hit : " , data)
        // return data
     },
     onSuccess : (data)=>{
       console.log("announcement update successfully......." , data);
            alert("Announcement update Successfully ");
     
          // refresh the 
          queryClient.invalidateQueries({ queryKey: ["adminanncements"] });

          //close form
          setUpdateForm(false);
          setOldAccouncement(null);
          //reset data
          reset();



     },

      onError : (error)=>{
         console.error("Error announcement update member:", error);
         alert("Announcement Update member!");


    }

  })

  

  // form 
 function handleFormSubmit(formData : any){
  mutation.mutate(formData);
 } 

 //upodate from
 function handleUpdate (data : any){
  const updateAnnouncement = {
    id : oldAnnouncement._id ,
     ...data
  }
  mutationUpdate.mutate(updateAnnouncement);
 }


 console.log("old announcement : " , oldAnnouncement);


  const filteredAnnouncements = data?.filter((announcement: any) =>
    announcement?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );





  return (
    <AdminLayout currentPage="announcements">
        <div className="space-y-6">
        {/* Search + Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8"
              disabled={isLoading || isError}
            />
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Announcement
          </Button>
        </div>

        {/* Announcements */}
        <div className="grid grid-cols-1 gap-6">
            {mutationDelete.isPending && <h1 className="text-center text-green-800 my-2">Deleting Member....</h1>}
           
        {
          isLoading ? <>
                  <h1 className="text-center text-green-800">Loading...</h1>
          </>:<>
               {
                isError ? <>
                         <h1 className="text-center red-green-800">{error?.message}</h1>
                  </>:<>
                  {filteredAnnouncements &&filteredAnnouncements.map((announcement: any) => (
            <Card key={announcement._id} className="p-6 border shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>

                    {announcement.category && (
                      // <Badge variant="outline" className={categoryColors[announcement.category] || ""}>
                      <Badge variant="outline" className={""}>
                        {announcement.category}
                      </Badge>
                    )}

                  </div>
                  <div className="flex gap-2">
                    <Button
                    onClick={()=>{
                      setOldAccouncement(announcement);
                      setUpdateForm(true);
                    }}
                    variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                    disabled={mutationDelete.isPending}
                    onClick={()=>{
                      mutationDelete.mutate(announcement._id || null);
                    }}
                    variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{announcement.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{format(new Date(announcement.date), "d MMM yyyy")}</span>
                </div>
              </div>
            </Card>
          ))}
                  
                  </>
               }
          </>
        }
       
        </div>

        {/* Form Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Add New Announcement</DialogTitle>
              </DialogHeader>

              <Input
                placeholder="Title"
               {...register("title")}
              />
              <Textarea
                placeholder="Description"
                {...register("description")}
              />
              <Input
                type="date"
                {...register("date")}
              />
              <DialogFooter>
                <Button
                disabled={mutation.isPending}
                type="submit">
                  {
                    mutation.isPending ? "adding...." : "Submit"
                  }
                  </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* update announcement */}
         <Dialog 
         open={updateForm} onOpenChange={()=>{
          setUpdateForm(false);
          setOldAccouncement(null);
         }}>
          <DialogContent
              onInteractOutside={(e) => e.preventDefault()}   // disable backdrop close
              onEscapeKeyDown={(e) => e.preventDefault()}     // disable Esc close
          >
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Update Announcement</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-yellow-900">{oldAnnouncement?.title}</p>
              <Input
                placeholder="Title"
               {...register("title")}
              />

              <p className="text-sm text-yellow-900">{oldAnnouncement?.description}</p>

              <Textarea
              
                placeholder="Description"
                {...register("description")}
              />
              <p className="text-sm text-yellow-900">{oldAnnouncement?.date}</p>
              
              <Input
                type="date"
              
                {...register("date")}
              />
              <DialogFooter>
                <Button
                disabled={ mutationUpdate.isPending }
                type="submit">
                  {
                    mutationUpdate.isPending ? "updating...." : "Submit"
                  }
                  </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminAnnouncements;
