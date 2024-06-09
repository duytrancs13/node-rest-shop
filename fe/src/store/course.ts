import { createSlice } from "@reduxjs/toolkit";

import { CourseI } from "types/course";

import { CODE } from "service/http-common";
import courseService from "service/course";
import { INVALID_TOKEN } from "constant/number";

interface initialCourseStateI {
  courses: Array<CourseI> | null;
  isLoadingCourses: boolean;

  myCourse: Array<CourseI> | null;
  isLoadingMyCourse: boolean;
}

const initialState: initialCourseStateI = {
  courses: null,
  isLoadingCourses: false,

  myCourse: null,
  isLoadingMyCourse: false,
};

// Slice
const slice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    fetchingCourses: (state) => {
      state.isLoadingCourses = true;
    },
    fetchedSuccessCourses: (
      state,
      action: {
        payload: Array<CourseI> | null;
      }
    ) => {
      state.courses = action.payload;
      state.isLoadingCourses = false;
    },

    fetchingMyCourse: (state) => {
      state.isLoadingMyCourse = true;
    },
    fetchedSuccessMyCourse: (
      state,
      action: {
        payload: Array<CourseI> | [];
      }
    ) => {
      state.myCourse = action.payload;
      state.isLoadingMyCourse = false;
    },
  },
});

// Actions
const {
  fetchingCourses,
  fetchedSuccessCourses,
  fetchingMyCourse,
  fetchedSuccessMyCourse,
} = slice.actions;
export const onFetchCourses =
  () =>
  async (dispatch: any): Promise<void> => {
    try {
      dispatch(fetchingCourses());
      const getCoursesResp = await courseService.getCourses();
      if (getCoursesResp?.error_code !== CODE.SUCCESS) {
        dispatch(fetchedSuccessCourses([]));
        return;
      }

      dispatch(fetchedSuccessCourses(getCoursesResp.data));
    } catch (error) {
      dispatch(fetchedSuccessCourses([]));
    }
  };

export const onFetchMyCourse =
  () =>
  async (dispatch: any): Promise<void> => {
    try {
      dispatch(fetchingMyCourse());
      const getMyCourseResp = await courseService.getMyCourse();
      if (getMyCourseResp?.error_code !== CODE.SUCCESS) {
        // retry
        if (getMyCourseResp?.error_code === INVALID_TOKEN) {
          const retryGetMyCourseResp = await courseService.getMyCourse();
          if (retryGetMyCourseResp?.error_code !== CODE.SUCCESS) {
            dispatch(fetchedSuccessMyCourse([]));
            return;
          }
          dispatch(fetchedSuccessMyCourse(getMyCourseResp.data));
          return;
        }

        dispatch(fetchedSuccessMyCourse([]));
        return;
      }
      dispatch(fetchedSuccessMyCourse(getMyCourseResp.data));
    } catch (error) {
      dispatch(fetchedSuccessMyCourse([]));
    }
  };

export default slice.reducer;
