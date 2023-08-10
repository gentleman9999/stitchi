import { MembershipNotificationSettingRecord } from '../db/membership-notification-setting-table'

export interface MembershipFactoryMembershipNotificationSetting
  extends MembershipNotificationSettingRecord {}

const membershipNotificationSettingFactory = ({
  membershipNotificationSettingRecord,
}: {
  membershipNotificationSettingRecord: MembershipNotificationSettingRecord
}): MembershipFactoryMembershipNotificationSetting => {
  return {
    id: membershipNotificationSettingRecord.id,
    emailNotificationsEnabled:
      membershipNotificationSettingRecord.emailNotificationsEnabled,
    smsNotificationsEnabled:
      membershipNotificationSettingRecord.smsNotificationsEnabled,
    webNotificationsEnabled:
      membershipNotificationSettingRecord.webNotificationsEnabled,
  }
}

export { membershipNotificationSettingFactory }
