export const createNotification = (newNotification) => Notifications.create(newNotification);

export const getAllNotifications = () => {
    const notifications = await Booking.findAll({
        where: {
            userId
        },
        include: {
        model: Trip,
            as: 'trip',
            attributes: ['id'],
            include: {
                model: Location,
                as: 'locations',
                attributes: ['name', 'type']
            }
        }
    });
    return notifications;
}
