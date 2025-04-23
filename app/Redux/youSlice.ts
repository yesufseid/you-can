
import { createSlice} from "@reduxjs/toolkit";

type activityProps={
  id:string
  name:string,
  mass:number,
  image:string ,
  created_at:string
}
interface PlayerState {
  category:activityProps[];
  loading: boolean;
  error: boolean;
  filterd:activityProps[];

}

const initialState: PlayerState = {
  category: [],
  filterd:[],
  loading: false,
  error: false,
};
const  youSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category= action.payload;
    },
    addCategory: (state, action) => {
      state.category.push(action.payload)
    },
    addFilterd: (state, action) => {
      state.filterd.push(action.payload)
    },
    setLoading: (state, action) => {
      state.loading= state.loading=action.payload
    },
    setError: (state, action) => {
      state.error= state.error=action.payload
    },
  },
});

export const { addCategory,setCategory,setError,setLoading,addFilterd} =youSlice.actions;
export default youSlice.reducer;
