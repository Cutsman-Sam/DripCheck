import Constants from 'expo-constants'
import * as Persmissions from 'expo-permissions'

class UserPermissions {
    getCameraPermission = async () => {
        if(Constants.platform.ios) {
            const [status] = await Permissions.askAsync(Persmissions.MEDIA_LIBRARY)

            if(status != "granted") {
                alert("Enable camera roll access?")
            }
        }
    }
}

export default new UserPermissions();