import Model from '../models';

const { Flight } = Model;

export const postFlightDetails = async data => Flight.create(data);
