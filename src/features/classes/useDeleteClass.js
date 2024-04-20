import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteClass as deleteClassAPI } from "../../services/apiClasses";

export function useDeleteClass() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteClass } = useMutation({
    mutationFn: deleteClassAPI,
    onSuccess: () => {
      toast.success("Class successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteClass };
}
