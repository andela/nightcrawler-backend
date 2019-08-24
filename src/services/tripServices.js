import Model from '../models';

const { TripRequest } = Model;

export const postTrip = async body => TripRequest.create(body);


