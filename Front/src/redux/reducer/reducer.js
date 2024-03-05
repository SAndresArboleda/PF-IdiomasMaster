import {
  ALL_COURSES,
  COURSE_DETAIL,
  FILTERED_COURSES,
  FILTER_LANGUAGE,
  FILTER_LEVEL,
  ORDER_PRICE,
  SEARCH,
  ADMINPRODUCT,
  ADMINUSER,
  SET_USER_DATA,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SET_EDITED_DATA,
  ADMINREVIEW,
  ALL_USERS,
  USER_COURSES,
  POST_USER_SUCCESS,
  POST_USER_FAIL,
  GET_CART,
  ADD_CART,
  DELETE_CART,
  GET_COURSE_REVIEW,

} from "../action/actiontypes";

let initialState = {
  courses: [],
  coursesCopy: [],
  courseDetail: [],
  coursesName: [],
  courseLanguage: "",
  userData: "",
  error: null,
  loading: false,
  user: {
    loading: false,
  },
  adminProduct: null,
  adminUser: null,
  adminReview: null,
  allUsers: [],
  userCourses: [],
  postStatus: false,
  postStatusFail: false,
  postError: null,
  currentCart: [],
  language: '',
  courseReview: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_COURSES:
      return {
        ...state,
        courses: payload,
        coursesCopy: payload,
        coursesCopy: payload,
      };
    case COURSE_DETAIL:
      return {
        ...state,
        courseDetail: payload,
      };

    case FILTER_LANGUAGE:
      const filteredByLanguage = state.coursesCopy.filter(
        (course) => course.language === payload
      );
      return {
        ...state,
        courses: filteredByLanguage,
        coursesName: filteredByLanguage,
      };
    case FILTER_LEVEL:
      const filteredByLevel = state.coursesCopy.filter(
        (course) => course.level === payload
      );
      return {
        ...state,
        courses: filteredByLevel,
        coursesName: filteredByLevel,
      };
    case ORDER_PRICE:
      if (payload === "default") {
        return {
          ...state,
          courses: state.coursesCopy, 
          courses: state.coursesCopy,
        };
      }
      const sortOrder = payload === "A" ? 1 : -1;
      const sortedArray = [...state.courses].sort(
        (a, b) => sortOrder * (a.price - b.price)
      );
      return {
        ...state,
        courses: sortedArray,
        coursesName: sortedArray,
      };
    case SEARCH:

      return {
        ...state,
        courses: state.coursesCopy,
        coursesName: payload[0],
        courseLanguage: payload[1],
      };

    case FILTERED_COURSES:
      return {
        ...state,
        courses: payload,
      };

    case ADMINPRODUCT:
        return{
            ...state,
            adminProduct: payload
        };

        case ADMINUSER:
        return{
            ...state,
            adminUser: payload
        }

        case SET_USER_DATA:
          return {
            ...state,
            userData: payload,
          };
      
        case ADMINREVIEW:
          return{
            ...state,
            adminReview: payload
          }
          case ALL_USERS:
            return{
              ...state,
              allUsers: payload
            }
          case USER_COURSES:
            return{
              ...state,
              userCourses: payload
            }
          case GET_USER_SUCCESS:
            return {
              ...state,
              userData: payload,
              error: null
            };
          case GET_USER_FAILURE:
            return {
              ...state,
              userData: null,
              error: payload
            };
            case SET_EDITED_DATA:
              return {
                ...state,
                ...action.payload
              };
          case POST_USER_SUCCESS:
            return{
              ...state,
              postStatus: true
            }
          case POST_USER_FAIL:
            return{
              ...state,
              postStatusFail: false,
              postStatus: false,
              postError: payload
            }

      case GET_CART:
        return{
          ...state,
          currentCart: payload
        }
      case ADD_CART:
        return{
          ...state,
          currentCart: payload
        }
      case DELETE_CART:
        return{
          ...state,
          currentCart: payload
        }
      case GET_COURSE_REVIEW:
        return{
          ...state,
          courseReview: payload
        }
     
     
    default:
      return state;
  }
};

export default reducer;
