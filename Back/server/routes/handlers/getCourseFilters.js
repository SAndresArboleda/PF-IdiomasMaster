const Course = require("../.././database/models/Course");

const getCourseFilters = async (req, res) => {
  try {
    const { language, level } = req.query;

    console.log(language);

    if (level === "all" && language === "all") {
      let course = await Course.find({});

      return res.status(200).json(course);
    }

    if (language === "all" && level !== "all") {
      let course = await Course.find({});

      let allCourses = course.filter((element) => element.level === level);

      return res.status(200).json(allCourses);
    }

    if (level === "all" && language !== "all") {
      let course = await Course.find({});

      let allCourses = course.filter(
        (element) => element.language === language
      );

      return res.status(200).json(allCourses);
    }

    if (level !== "all" && language !== "all") {
      let course = await Course.find({});

      let allCourses = course.filter(
        (element) => element.language === language
      );

      let findAllCourses = allCourses.filter(
        (element) => element.level === level
      );

      return res.status(200).json(findAllCourses);
    }

    // if (language) {
    //   let course = await Course.find({ language });

    //   if (level.length > 0) {
    //     let findAllCourses = allCourses.filter(
    //       (element) => element.level === level
    //     );

    //     return res.status(200).json(findAllCourses);
    //   }

    //   return res.status(200).json(course);
    // }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getCourseFilters;

// if (language && level) {
//   let course = await Course.find({ language });

//   if (course.length > 0 && level) {
//     let allCourses = course.filter((element) => element.level === level);

//     if (num && (num.toUpperCase() === "A" || num.toUpperCase() === "B")) {
//       if (num.toUpperCase() === "A") {
//         allCourses = sortByAscending(allCourses, "price");
//       } else {
//         allCourses = sortByDescending(allCourses, "price");
//       }
//     }

//     return res.status(200).json(allCourses);
//   } else if (course.length > 0) {
//     return res.status(200).json(course);
//   } else {
//     return res.status(400).send("We dont have courses with your matches");
//   }
// }

// if (num && (num.toUpperCase() === "A" || num.toUpperCase() === "B")) {
//   let allCourses = await Course.find({});

//   if (allCourses.length > 0 && level) {
//     allCourses = allCourses.filter((element) => element.level === level);

//     if (num.toUpperCase() === "A") {
//       allCourses = sortByAscending(allCourses, "price");
//     } else {
//       allCourses = sortByDescending(allCourses, "price");
//     }

//     return res.status(200).json(allCourses);
//   }

//   return res.status(200).json(allCourses);
// }

// if (language && !level) {
//   let course = await Course.find({ language });

//   if (num.toUpperCase() === "A") {
//     allCourses = sortByAscending(allCourses, "price");
//   } else {
//     allCourses = sortByDescending(allCourses, "price");
//   }

//   return res.status(200).json(course);
// }

// if (level && !language) {
//   let course = await Course.find({ level });

//   if (num.toUpperCase() === "A") {
//     allCourses = sortByAscending(allCourses, "price");
//   } else {
//     allCourses = sortByDescending(allCourses, "price");
//   }
//   return res.status(200).json(course);
// }
