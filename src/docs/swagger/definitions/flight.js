export const FlightCreate = {
  type: 'object',
  properties: {
    airline: {
      type: 'string',
      example: 'British Airways'
    },
    ticketNumber: {
      type: 'string',
      example: 'BRAW16829033',
    },
    departureDate: {
      type: 'date',
      example: '08-08-2019',
    },
    returnDate: {
      type: 'date',
      example: '09-09-2019',
    },
  }
};
