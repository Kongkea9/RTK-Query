import { apiSlice } from "../api/apiSlice";

export const fileSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        uploadFile: builder.mutation({
            query:(formdata) =>({
                url:"/files/upload",
                method:"POST",
                body: formdata
            })
        })
    })
});

export const {useUploadFileMutation} = fileSlice;



