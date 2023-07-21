# 001 Notifications
Notifications are a mechanism used by our app to comunicate with a user when a specific action on the platform has occored. For example, if a user submits a "Design Request", we want to notify any available artists that a new Design Request is ready to be claimed.

## Requirements
- [ ] System is able to schedule a notification with a single function
- [ ] Notifications can have multiple delivery mechanisms (in-app, email, SMS)
- [ ] We should know when a notification was sent, to whom, and exactly what was sent in the contents of the notification
- [ ] Users should be able to configure their notification preference (email, sms, both)
- [ ] A notification is sent to a user (or organization? spike)

## Notification Lifecycle
1. Action occors (i.e. order.created event emitted)
2. Look up notifications to be sent when order.created
    - order.created.customer (thanks for your order)
    - order.created.artist  (someone placed an order with your design)
    - order.created.fulfillment (order placed)

3. Retrieve each user's notification preferences.
    - User notification preferences are checked to identify the preferred delivery mechanism(s) for the notification (in-app, email, SMS, or a combination of these).

4. Schedule the notifications.
    - Based on user preferences, notifications are scheduled. Each notification includes the necessary data like recipient, content, and delivery mechanism.

5. Send the notifications.
    - The system initiates the process of sending the scheduled notifications to the corresponding users.

6. Record the notifications.
    - Every notification sent is recorded along with the date/time of sending, recipient, and content. This is useful for tracking and future reference.
7. Users receive and interact with the notifications.
    - Users receive the notifications through their preferred delivery mechanism(s) and can then interact with the notification, for example, by clicking on a link to view the order.
8. Track user interaction.
    - The system tracks when the user interacts with the notification and records this interaction. This helps in understanding user engagement with the platform.
9. If the notification fails, handle the error.




## Example Code
```ts
// order-service/update-order.ts

const updateOrder = () => {
    // ...
    events.emit('order.updated', {
        prevOrder: {},
        nextOrder: {},
    })
}

```

```ts
// order-service/events/order-updated.ts
const handleOrderUpdated = (prevOrder, nextOrder) => {
    if(prevOrder.status !== nextOrder.status) {
        if(nextOrder.status === 'PAID') {
            const notificationChannelTemplates = notificationService.listNotificationChannelTemplates({
                resourceType: NotificationResourceType.ORDER,
                resourceAction: NotificationResourceAction.CREATED,
            })

            const notificationChannels = notificationChannelTemplates.map(tempalate => {
                template.render({
                    // ...
                })
            })

            
            
        }
    }
}
```


```ts


const notification = await notificationService.createNotification({
    notification: {
        resourceType: NotificationResourceType.ORDER,
        resourceAction: NotificationResourceAction.CREATED,
        sendAt: new Date(),
        recipientUserIds: [''],
        status: NotificationStatus.SCHEDULED, // NotificationStatus.PROCESSING, NotificationStatus.SENT, NotificationStatus.ERROR
        channels: [{
            type: NotificationChannel.SMS,
            message: '',
            readStatus: false,
        }, 
        {
            type: NotificationChannel.EMAIL,
            subject: '',
            body: '',
            readStatus: false,
        }, 
        {
            type: NotificationChannel.WEB,
            message: '',
            readStatus: false
        }]
    }
})
```