import axios from './api'


const UserService = {
    async getUser() {
        const {data} = await axios.get('/user')
        return data
    },
    async editUser(user) {
        const {data} = await axios.put('/user', {user})
        return data
    }
}

export default UserService