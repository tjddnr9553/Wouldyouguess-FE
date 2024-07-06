import axios from 'axios';
export const API_BASE_URL = import.meta.env.API_BASE_URL;


export const room_create = async (userId) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${API_BASE_URL}/api/room`,
            data: {
                userId
            }
        });

        return res;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export const room_delete = async (roomId) => {
    try {
        const res = await axios({
            method: "DELETE",
            url: `${API_BASE_URL}/api/room/${roomId}`,
        });
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export const room_join = async (roomId, userId) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${API_BASE_URL}/room/${roomId}/join`,
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

export const room_exit = async (roomId, userId) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${API_BASE_URL}/room/${roomId}/exit`,
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
