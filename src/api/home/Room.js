import axios from 'axios';
export const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;


export const room_create = async (userId) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${API_SERVER_URL}/api/room`,
            data: {
                userId
            }
        });
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const room_users = async (roomId) => {
    try {
        const res = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/room/${roomId}/users`,
        });
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
}


export const room_join = async (userId, roomId) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${API_SERVER_URL}/api/room/${roomId}/join`,
            data: {
                userId
            }
        });
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const room_exit = async (userId, roomId) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${API_SERVER_URL}/room/${roomId}/exit`,
            data: {
                userId
            }
        });
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};
