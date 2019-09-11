// eslint-disable-next-line import/named
import { created, success } from './definitions/successResponse';
import {
  badRequest, notAuthorized, accessForbidden, notFound, conflict,
  serverError
} from './definitions/errorResponse';
import { SigninCreate, Signin, Logout } from './definitions/auth';
import {
  createUser, updateRoleReq, updateRoleRes,
  resetPassword, resetPasswordResponse, forgotPassword, resetUserPassword, verifyUser
} from './definitions/users';
import { permissionsRes } from './definitions/permissions';
import { updateRolePermissionsReq, rolesRes, updateRolePermissionsRes } from './definitions/roles';
import {
  createAccommodationReq, createAccommodationRes, createRoomReq, createRoomRes,
  getAccommodationRes, getAllAccommodationsRes, checkAccommodationLikeRes,
  likeUnlikeAccommodationRes, createReview
} from './definitions/accommodation';
import {
  createBookingReq, createBookingRes, getBookingRes, getAllBookingsRes
} from './definitions/booking';


import { signInPath, logoutPath } from './paths/auth';
import {
  userRolePath, createUserPath, resetPasswordPath, forgotPasswordPath, resetUserPasswordPath,
  verifyUserPath, fetchTripPath,
} from './paths/users';
import {
  requestTrip, approvedTripPath, getTripPath, returnTrip, multiCityTripPath, rejectTripPath, getTripStatsPath, searchTripRequestPath
} from './paths/trips';
import {
  createTrip, returnTripSchema, createMultiCityTrip, multiCityTripRes,
  rejectTripRequest, getTripStats
} from './definitions/trip';
import { permissionsPath } from './paths/permissions';
import { rolesPath, rolePermissionsPath } from './paths/roles';
import {
  createAccommodationPath, createRoomPath, getAccommodationPath, getTripAccommodationsPath,
  accommodationLike, createAndFetchReviewPath, updateAndDeleteReviewPath
} from './paths/accommodations';
import {
  bookingPath, getSingleBookingPath
} from './paths/booking';
import socialMediaAuthentication from './definitions/socialMedia';
import { googlePath, facebookPath } from './paths/socialAuth';
import {
  ProfileCreate, ProfileResponds, ProfileHeaders, ProfileUpdate, ProfileUpdateResponds
} from './definitions/profile';
import profilePath from './paths/profile';
import { createComment } from './definitions/createComment';
import { createCommentPath, deleteCommentPath, getTripCommentsPath } from './paths/commentPath';
import { postChatPath, getChatsPath } from './paths/chat';
import { markAllNotficationPath } from './paths/notification';
import { createChat } from './definitions/chat';
import { flightPath } from './paths/flight';
import { FlightCreate } from './definitions/flight';
import { accommodationRatingSchema } from './definitions/rating';
import { accommodationRating, getAccommodationRatings } from './paths/rating';

const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Barefoot Nomad API',
    description: 'API Documentation for Barefoot Nomad.',
    header: 'none'
  },
  host: 'bn-api-staging.herokuapp.com',
  basePath: '/api/v1/',
  produces: ['application/json'],
  consumes: ['application/json'],
  schemes: ['https', 'http'],
  securityDefinitions: {
    BearerToken: {
      description: `
        All protected routes must be accessed with a Bearer Token.
        The JWT Token is generated by the API upon user login.`,
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    },
  },
  tags: [
    {
      name: 'auth',
      description: 'Everything about authentication'
    },
    {
      name: 'users',
      description: 'Everything about the user interaction'
    },
    {
      name: 'permissions',
      description: 'Everything about permissions'
    },
    {
      name: 'roles',
      description: 'Everything about roles'
    },
    {
      name: 'trips',
      description: 'Trip related actions'
    },
    {
      name: 'accommodations',
      description: 'Accommodation related endpoints'
    },
    {
      name: 'bookings',
      description: 'Accommodation related endpoints'
    },
    {
      name: 'chats',
      description: 'Chat related endpoints'
    },
    {
      name: 'flights',
      description: 'Flight related endpoints'
    },
    {
      name: 'notifications',
      description: 'notification related endpoints'
    }
  ],
  paths: {
    '/auth/signin': signInPath,
    '/auth/logout': logoutPath,
    '/users': createUserPath,
    '/users/verify': verifyUserPath,
    '/users/roles/{roleId}': userRolePath,
    '/permissions': permissionsPath,
    '/roles': rolesPath,
    '/roles/{roleId}/permissions': rolePermissionsPath,
    '/users/forgot-password': forgotPasswordPath,
    '/users/reset-forgot-password': resetPasswordPath,
    '/users/reset-user-password': resetUserPasswordPath,
    '/trips/oneway': requestTrip,
    '/trips/multicity': multiCityTripPath,
    '/trips/{tripId}/approve': approvedTripPath,
    '/trips/{tripId}': getTripPath,
    '/trips/{tripId}/comment': createCommentPath,
    '/trips/{tripId}/reject': rejectTripPath,
    '/trips/{tripId}/comments': getTripCommentsPath,
    '/trips/{tripId}/comments/{commentId}': deleteCommentPath,
    '/trips/search/?key={key}': searchTripRequestPath,
    '/trips/return': returnTrip,
    '/trips/stats': getTripStatsPath,
    '/accommodations': createAccommodationPath,
    '/accommodations/rooms/{accommodationId}': createRoomPath,
    '/accommodations/{accommodationId}': getAccommodationPath,
    '/accommodations/{accommodationId}/rating': accommodationRating,
    '/accommodations/{accommodationId}/ratings': getAccommodationRatings,
    '/accommodations/trip/{tripId}': getTripAccommodationsPath,
    '/accommodations/like/{accommodationId}': accommodationLike,
    '/accommodations/trips/{tripId}': getTripAccommodationsPath,
    '/accommodations/{accommodationId}/reviews': createAndFetchReviewPath,
    '/accommodations/{accommodationId}/reviews/{reviewId}': updateAndDeleteReviewPath,
    '/auth/google': googlePath,
    '/auth/facebook': facebookPath,
    '/user': createUser,
    '/users/profile': profilePath,
    '/users/trips': fetchTripPath,
    '/bookings': bookingPath,
    '/bookings/{bookingId}': getSingleBookingPath,
    '/notifications/readAll': markAllNotficationPath,
    '/chat': postChatPath,
    '/chats/?sender={sender}&recipient={recipient}': getChatsPath,
    '/flights/add/{tripId}': flightPath
  },
  definitions: {
    createMultiCityTrip,
    multiCityTripRes,
    createBookingReq,
    createBookingRes,
    getBookingRes,
    getAllBookingsRes,
    getAccommodationRes,
    getAllAccommodationsRes,
    createAccommodationRes,
    createAccommodationReq,
    createRoomReq,
    createRoomRes,
    rejectTripRequest,
    SigninCreate, // signin request
    Signin, // signin response
    createUser, // create user
    verifyUser, // verify user
    success, // 200
    created,
    ProfileHeaders, // profile header token
    ProfileCreate, // profile create request
    ProfileResponds, // profile response
    ProfileUpdate, // profile update request
    ProfileUpdateResponds, // profile update response
    updateRoleReq,
    updateRoleRes,
    permissionsRes,
    forgotPassword,
    resetUserPassword,
    updateRolePermissionsReq,
    updateRolePermissionsRes,
    accommodationRatingSchema,
    rolesRes,
    createTrip,
    createComment,
    resetPassword, // reset password request
    resetPasswordResponse,
    badRequest, // 400
    notAuthorized, // 401
    accessForbidden, // 403
    notFound, // 404
    conflict, // 409
    serverError, // 503
    socialMediaAuthentication, // social media login response
    Logout,
    returnTripSchema,
    createChat,
    checkAccommodationLikeRes,
    likeUnlikeAccommodationRes,
    createReview,
    FlightCreate,
    getTripStats
  }
};

export default swaggerDocument;
