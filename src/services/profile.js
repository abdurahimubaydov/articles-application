import axios from './api'

const ProfileSerice = {
    async getProfile(username) {
        const {data} = await axios.get(`/profiles/${username}`)
        return data
    } ,
    async followProfile(username, follow) {
        const {data} = await axios.post(`/profiles/${username}/follow`, {follow})
        return data
    },
    async unfollowProfile(username,unfollow) {
        const {data} = await axios.delete(`/profiles/${username}/follow`, {unfollow})
        return data
    }
}

export default ProfileSerice