import { setFilteredCourses } from "../../reducer/courses/courseSlice";

export const filterCoursesAction =
  (selectedCategories, selectedLevels) => (dispatch) => {
    // Cek jika kategori atau level kesulitan kosong
    if (!selectedCategories && !selectedLevels) {
      dispatch(
        setFilteredCourses({ selectedCategories: [], selectedLevels: [] }),
      );
      return;
    }

    // Cek jika kategori atau level kesulitan undefined
    if (selectedCategories === undefined || selectedLevels === undefined) {
      return;
    }

    dispatch(setFilteredCourses({ selectedCategories, selectedLevels }));
  };
