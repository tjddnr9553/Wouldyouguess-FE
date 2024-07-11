import axios from "axios";

export const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;


export const update_nickname = async (userId, nickname) => {
    try {
        const res = await axios({
            method: "PATCH",
            url: `${API_SERVER_URL}/api/users/${userId}/nickname`,
            data: {
                nickname
            }
        });

        return res.data;
    } catch (error) {
        throw new Error(error);
    }
}